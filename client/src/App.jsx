import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Values from './components/Values';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Seo from './components/Seo';
import './App.css';

function App() {
  return (
    <div className="app">
      <a href="#accueil" className="skip-link">
        Aller au contenu principal
      </a>
      <Seo />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Values />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
