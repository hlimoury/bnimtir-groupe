import { FiCheckCircle } from 'react-icons/fi';
import AnimateOnScroll from './AnimateOnScroll';
import { useLanguage } from '../i18n/LanguageContext';
import './About.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="apropos" className="section about">
      <div className="about__decor about__decor--1" />
      <div className="about__decor about__decor--2" />
      <div className="container">
        <div className="about__grid">
          <AnimateOnScroll direction="left" className="about__content">
            <span className="section-tag">{t.about.tag}</span>
            <h2 className="section-title about__title">{t.about.title}</h2>
            <p className="about__text">{t.about.text1}</p>
            <p className="about__text">{t.about.text2}</p>
            <ul className="about__list">
              {t.about.points.map((point) => (
                <li key={point} className="about__list-item">
                  <FiCheckCircle className="about__check" />
                  {point}
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={200} className="about__visual">
            <div className="about__card about__card--main">
              <img src="/logo.jpg" alt="BNIMTIR GROUPE" className="about__logo" />
              <p className="about__tagline">{t.about.tagline}</p>
            </div>
            <div className="about__card about__card--accent">
              <span className="about__accent-number">BG</span>
              <p>{t.about.accent}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
