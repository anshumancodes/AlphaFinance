# AlphaFinance

AlphaFinance is a financial data aggregation API that provides access to various financial markets data including Nifty 50, GIFT Nifty, USD/INR forex rates, and market capitalization information.

## Features

- **Nifty 50 Data**: Access real-time Nifty 50 index data
- **USD/INR Exchange Rate**: Get current forex rates
- **Market Capitalization**: Retrieve market cap data for indices
- **GIFT Nifty Futures**: Access GIFT Nifty data
- **Combined Endpoint**: Get all financial data in a single API call

## API Endpoints

- **GET /** - Root endpoint with API information
- **GET /indices** - Nifty 50 & Sensex data
- **GET /forex** - USD/INR exchange rate
- **GET /market-cap** - Market capitalization data
- **GET /gift-nifty** - GIFT Nifty futures data
- **GET /all-data** - All financial data combined

## Tech Stack

- Node.js
- Express.js
- Axios for API requests
- MongoDB for data storage (coming soon)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/AlphaFinance.git
   ```

2. Install dependencies:
   ```
   cd AlphaFinance
   npm install
   ```

3. Create a `.env` file with your API keys:
   ```
   PORT=3002
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
   FINNHUB_API_KEY=your_finnhub_key
   YAHOO_FINANCE_API_KEY=your_rapidapi_key
   YAHOO_FINANCE_HOST=yahoo-finance15.p.rapidapi.com
   ```

4. Start the server:
   ```
   cd backend
   node Express.js
   ```

## API Keys

To use all features, you'll need to obtain API keys from:

- [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- [Finnhub](https://finnhub.io/register)
- [RapidAPI (Yahoo Finance)](https://rapidapi.com/apidojo/api/yahoo-finance1)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---
**AlphaFinance** - Transforming financial data with AI-powered insights.

