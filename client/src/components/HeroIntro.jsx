import { FiShield } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import './HeroIntro.css';
import './Hero.css';

export default function HeroIntro() {
  const { t } = useLanguage();

  return (
    <section className="hero-intro">
      <div className="hero-intro__bg">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />
        <div className="hero__shape hero__shape--4" />
        <div className="hero__shape hero__shape--5" />
      </div>

      <div className="container hero-intro__content">
        <div className="hero-intro__badge">
          <FiShield />
          <span>{t.hero.badge}</span>
        </div>

        <p className="hero-intro__description">{t.hero.description}</p>

        <div className="hero-intro__stats">
          <div className="hero-intro__stat">
            <span className="hero-intro__stat-number">4+</span>
            <span className="hero-intro__stat-label">{t.hero.stat1}</span>
          </div>
          <div className="hero-intro__stat">
            <span className="hero-intro__stat-number">100%</span>
            <span className="hero-intro__stat-label">{t.hero.stat2}</span>
          </div>
          <div className="hero-intro__stat hero-intro__stat--logo">
            <img src="/logo.jpg" alt="BNIMTIR GROUPE" className="hero-intro__logo" />
          </div>
        </div>
      </div>
    </section>
  );
}
