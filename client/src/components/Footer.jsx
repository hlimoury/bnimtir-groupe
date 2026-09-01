import { FaLinkedin } from 'react-icons/fa';
import { FiHome, FiUsers, FiDroplet, FiShield } from 'react-icons/fi';
import './Footer.css';

const footerLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#services', label: 'Services' },
  { href: '#carrieres', label: 'Carrières' },
  { href: '#contact', label: 'Contact' },
];

const services = [
  { icon: FiHome, label: 'Gestion de Syndic' },
  { icon: FiUsers, label: 'Intérim' },
  { icon: FiDroplet, label: 'Nettoyage' },
  { icon: FiShield, label: 'Sécurité' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <img src="/logo.jpg" alt="BNIMTIR GROUPE" className="footer__logo" />
            </div>
            <p className="footer__description">
              BNIMTIR GROUPE — Votre partenaire de confiance au Maroc pour la gestion de
              syndic, l'intérim, le nettoyage et la sécurité.
            </p>
            <p className="footer__phone">
              <a href="tel:+212532465151">0532-465151</a>
            </p>
            <a
              href="https://www.linkedin.com/in/groupe-b-83b3692a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>

          <div className="footer__links">
            <h4>Navigation</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__services">
            <h4>Nos services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.label}>
                  <s.icon />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} BNIMTIR GROUPE. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
