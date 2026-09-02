import { FaLinkedin } from 'react-icons/fa';
import { FiHome, FiUsers, FiDroplet, FiShield } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import './Footer.css';

const serviceIcons = [FiHome, FiUsers, FiDroplet, FiShield];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: '#accueil', label: t.nav.home },
    { href: '#apropos', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#carrieres', label: t.nav.careers },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <img src="/logo.jpg" alt="BNIMTIR GROUPE" className="footer__logo" />
            </div>
            <p className="footer__description">{t.footer.description}</p>
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
            <h4>{t.footer.navigation}</h4>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__services">
            <h4>{t.footer.ourServices}</h4>
            <ul>
              {t.services.items.map((s, i) => {
                const Icon = serviceIcons[i];
                return (
                  <li key={s.title}>
                    <Icon />
                    {s.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} BNIMTIR GROUPE. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
