import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import HeroIntro from './components/HeroIntro';
import About from './components/About';
import Services from './components/Services';
import Values from './components/Values';
import Partners from './components/Partners';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from './components/Seo';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { useLanguage } from './i18n/LanguageContext';
import './App.css';

function AppContent() {
  const { t } = useLanguage();

  return (
    <div className="app">
      <a href="#accueil" className="skip-link">
        {t.common.skipLink}
      </a>
      <Seo />
      <Navbar />
      <main id="main-content">
        <div id="accueil">
          <HeroCarousel />
          <HeroIntro />
        </div>
        <About />
        <Services />
        <Values />
        <Partners />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
