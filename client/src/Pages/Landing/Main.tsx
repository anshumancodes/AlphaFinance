
import Navbar from './Navbar';
import Hero from './Hero';
import FinancialAnalytics from './FinancialAnalytics';
import Features from './Features';
import HowOurAIWorks from './HowOurAIWorks';
import ExperienceOurplatform from './ExperienceOurplatform';
import CTASection from './CTASection';
import AlphaFinanceFooter from './AlphaFinanceFooter';


function Main() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:px-8 lg:px-16">
        <Hero />
         <Features/>
        <FinancialAnalytics/>
        <HowOurAIWorks/>
        <ExperienceOurplatform/>
        <CTASection/>
        <AlphaFinanceFooter/>
     
      </main>
    </div>
  );
}

export default Main;
