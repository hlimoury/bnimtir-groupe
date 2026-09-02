import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#apropos', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#carrieres', label: t.nav.careers },
    { href: '#contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#accueil" className="navbar__logo">
          <img src="/logo.jpg" alt="BNIMTIR GROUPE" className="navbar__logo-img" />
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            className="navbar__lang"
            onClick={toggleLanguage}
            aria-label={lang === 'fr' ? 'Switch to Arabic' : 'Passer en français'}
          >
            <FiGlobe aria-hidden="true" />
            <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
          </button>

          <a href="#carrieres" className="btn btn-primary navbar__cta" onClick={handleNavClick}>
            {t.nav.joinUs}
          </a>
        </nav>

        <div className="navbar__mobile-actions">
          <button
            type="button"
            className="navbar__lang navbar__lang--mobile"
            onClick={toggleLanguage}
            aria-label={lang === 'fr' ? 'Switch to Arabic' : 'Passer en français'}
          >
            <FiGlobe aria-hidden="true" />
            <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
          </button>

          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.nav.menu}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
