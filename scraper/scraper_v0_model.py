import requests
from bs4 import BeautifulSoup
import random
import time
import json
import logging
import cloudscraper
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import concurrent.futures

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scraper.log"),
        logging.StreamHandler()
    ]
)

# Load proxy list - replace with your actual proxies
proxies = [
    "http://username:password@proxy1.com:port",
    "http://username:password@proxy2.com:port",
    "http://username:password@proxy3.com:port"
]

# Pre-defined user agents
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
]

# Function to get random headers
def get_headers():
    return {
        'User-Agent': random.choice(USER_AGENTS),
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Referer': 'https://www.google.com/'
    }

# Function to get a random proxy
def get_proxy():
    if not proxies:
        return None
    return random.choice(proxies)

# Session management
def create_session():
    session = requests.Session()
    session.headers.update(get_headers())
    return session

# Function to fetch BSE market data with proper error handling
def fetch_bse_data():
    try:
        # Using direct URL instead of bsedata package due to reliability issues
        url = "https://api.bseindia.com/bseindia/api/Sensex/getSensexData"
        session = create_session()
        proxy = get_proxy()
        proxies = {"http": proxy, "https": proxy} if proxy else None
        
        response = session.get(
            url, 
            proxies=proxies, 
            timeout=15
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logging.error(f"Failed to fetch BSE data: {e}")
        return None

# Function to fetch NSE market data with proper session handling
def fetch_nse_data():
    try:
        # NSE often requires a session cookie, so we'll first visit the homepage
        base_url = 'https://www.nseindia.com/'
        api_url = 'https://www.nseindia.com/api/marketStatus'
        
        session = create_session()
        proxy = get_proxy()
        proxies = {"http": proxy, "https": proxy} if proxy else None
        
        # First visit the homepage to get cookies
        session.get(
            base_url, 
            proxies=proxies, 
            timeout=15
        )
        
        # Wait a moment to avoid suspicion
        time.sleep(2)
        
        # Now fetch the API data
        response = session.get(
            api_url, 
            proxies=proxies, 
            timeout=15
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logging.error(f"Failed to fetch NSE data: {e}")
        return None

# Scraping function for Cloudflare-protected sites
def scrape_cloudflare(url):
    try:
        scraper = cloudscraper.create_scraper(
            browser={
                'browser': 'chrome',
                'platform': 'windows',
                'desktop': True
            }
        )
        scraper.headers.update(get_headers())
        
        response = scraper.get(url, timeout=20)
        response.raise_for_status()
        
        # Return parsed content instead of raw BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")
        return extract_relevant_data(url, soup)
    except Exception as e:
        logging.error(f"Cloudflare protection issue for {url}: {e}")
        return None

# Improved Selenium-based scraping with better resource management
def scrape_dynamic(url, element_xpath):
    driver = None
    try:
        options = Options()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument(f"user-agent={random.choice(USER_AGENTS)}")
        
        # Using webdriver_manager for easier driver management
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        
        driver.get(url)
        WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.XPATH, element_xpath)))
        
        # Give time for JavaScript to fully render
        time.sleep(3)
        
        soup = BeautifulSoup(driver.page_source, "html.parser")
        return extract_relevant_data(url, soup)
    except Exception as e:
        logging.error(f"Error fetching {url} dynamically: {e}")
        return None
    finally:
        if driver:
            driver.quit()

# Extract relevant data based on the source
def extract_relevant_data(url, soup):
    data = {}
    
    try:
        if "nseindia" in url:
            # Extract market data from NSE
            market_status = soup.select('.marketStatus')
            indices = soup.select('.indexValue')
            data["market_status"] = market_status[0].text.strip() if market_status else "N/A"
            data["nifty_value"] = indices[0].text.strip() if indices else "N/A"
            
        elif "bseindia" in url:
            # Extract market data from BSE
            sensex = soup.select('.sensexIndex')
            change = soup.select('.sensexChange')
            data["sensex_value"] = sensex[0].text.strip() if sensex else "N/A"
            data["sensex_change"] = change[0].text.strip() if change else "N/A"
            
        elif "moneycontrol" in url:
            # Extract headlines from MoneyControl
            headlines = soup.select('.headline')
            data["headlines"] = [h.text.strip() for h in headlines[:5]] if headlines else []
            
        elif "economictimes" in url:
            # Extract market highlights from ET
            highlights = soup.select('.marketHighlights li')
            data["highlights"] = [h.text.strip() for h in highlights[:5]] if highlights else []
            
        elif "yahoo" in url:
            # Extract market summary from Yahoo Finance
            summary = soup.select('.Mb\\(10px\\)')
            data["summary"] = summary[0].text.strip() if summary else "N/A"
            
        elif "tradingview" in url:
            # Extract market overview from TradingView
            overview = soup.select('.tv-widget-description__text')
            data["overview"] = overview[0].text.strip() if overview else "N/A"
            
        elif "worldbank" in url:
            # Extract GDP data from World Bank
            gdp_data = soup.select('.indicatorTile')
            data["gdp_info"] = gdp_data[0].text.strip() if gdp_data else "N/A"
            
        else:
            # Generic extraction for other sites
            title = soup.title.text if soup.title else "No title"
            data["title"] = title
            data["description"] = soup.find('meta', {'name': 'description'})['content'] if soup.find('meta', {'name': 'description'}) else "No description"
        
        return data
    except Exception as e:
        logging.error(f"Error extracting data from {url}: {e}")
        return {"error": str(e)}

# Function to scrape financial data from multiple sources with improved concurrency
def fetch_financial_data():
    sources = {
        "NSE India": {
            "url": "https://www.nseindia.com/",
            "method": "requests",
            "xpath": None
        },
        "BSE India": {
            "url": "https://www.bseindia.com/",
            "method": "requests",
            "xpath": None
        },
        "MoneyControl": {
            "url": "https://www.moneycontrol.com/",
            "method": "cloudflare",
            "xpath": None
        },
        "Economic Times": {
            "url": "https://economictimes.indiatimes.com/markets",
            "method": "selenium",
            "xpath": "//div[contains(@class, 'marketStatsBox')]"
        },
        "Yahoo Finance India": {
            "url": "https://in.finance.yahoo.com/",
            "method": "requests",
            "xpath": None
        },
        "TradingView India": {
            "url": "https://in.tradingview.com/markets/stocks-india/",
            "method": "selenium",
            "xpath": "//div[contains(@class, 'tv-category-header')]"
        },
        "World Bank GDP Data": {
            "url": "https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=IN",
            "method": "cloudflare",
            "xpath": None
        }
    }

    results = {}
    
    # Add API data sources
    results["BSE API Data"] = fetch_bse_data()
    results["NSE API Data"] = fetch_nse_data()
    
    # Define a worker function for concurrent processing
    def process_source(name, config):
        logging.info(f"Scraping {name} ({config['url']})...")
        time.sleep(random.uniform(1, 3))  # Random delay to avoid rate limiting
        
        try:
            if config['method'] == 'cloudflare':
                return scrape_cloudflare(config['url'])
            elif config['method'] == 'selenium':
                return scrape_dynamic(config['url'], config['xpath'])
            else:  # Regular requests
                session = create_session()
                proxy = get_proxy()
                proxies = {"http": proxy, "https": proxy} if proxy else None
                
                response = session.get(
                    config['url'], 
                    proxies=proxies, 
                    timeout=15
                )
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                return extract_relevant_data(config['url'], soup)
        except Exception as e:
            logging.error(f"Error processing {name}: {e}")
            return {"error": str(e)}
    
    # Use ThreadPoolExecutor for concurrent processing
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_to_source = {
            executor.submit(process_source, name, config): name 
            for name, config in sources.items()
        }
        
        for future in concurrent.futures.as_completed(future_to_source):
            source_name = future_to_source[future]
            try:
                results[source_name] = future.result()
            except Exception as e:
                logging.error(f"Error getting result for {source_name}: {e}")
                results[source_name] = {"error": str(e)}
    
    return results

if __name__ == "__main__":
    start_time = time.time()
    logging.info("Starting financial data scraping process...")
    
    try:
        financial_data = fetch_financial_data()
        
        # Save data to file with proper serialization
        with open("financial_data.json", "w", encoding="utf-8") as f:
            json.dump(financial_data, f, indent=4, ensure_ascii=False)
        
        logging.info(f"Data saved successfully! Process completed in {time.time() - start_time:.2f} seconds")
    except Exception as e:
        logging.error(f"Fatal error in main process: {e}")