import { FiCheckCircle } from 'react-icons/fi';
import AnimateOnScroll from './AnimateOnScroll';
import './About.css';

const points = [
  'Une équipe qualifiée et expérimentée',
  'Des solutions adaptées à chaque client',
  'Un engagement qualité sur tous nos services',
  'Une disponibilité et une réactivité constantes',
];

export default function About() {
  return (
    <section id="apropos" className="section about">
      <div className="about__decor about__decor--1" />
      <div className="about__decor about__decor--2" />
      <div className="container">
        <div className="about__grid">
          <AnimateOnScroll direction="left" className="about__content">
            <span className="section-tag">À propos</span>
            <h2 className="section-title about__title">
              BNIMTIR GROUPE, votre partenaire multi-services
            </h2>
            <p className="about__text">
              BNIMTIR GROUPE est un groupe marocain spécialisé dans les services
              aux entreprises et aux copropriétés. Nous mettons notre expertise au
              service de la gestion immobilière, du travail temporaire, du
              nettoyage professionnel et de la sécurité au Maroc.
            </p>
            <p className="about__text">
              Notre mission est d'offrir des prestations fiables, professionnelles
              et sur mesure, en plaçant la satisfaction de nos clients et de nos
              collaborateurs au cœur de nos priorités.
            </p>
            <ul className="about__list">
              {points.map((point) => (
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
              <p className="about__tagline">Excellence & Professionnalisme</p>
            </div>
            <div className="about__card about__card--accent">
              <span className="about__accent-number">BG</span>
              <p>Force & Fiabilité</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
