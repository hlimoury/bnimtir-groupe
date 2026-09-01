import { FiArrowRight, FiShield } from 'react-icons/fi';
import './Hero.css';

export default function Hero() {
  return (
    <section id="accueil" className="hero">
      <div className="hero__bg">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__badge">
            <FiShield />
            <span>Votre partenaire de confiance</span>
          </div>
          <h1 className="hero__title">
            Des solutions professionnelles pour{' '}
            <span className="hero__highlight">votre entreprise</span>
          </h1>
          <p className="hero__description">
            BNIMTIR GROUPE accompagne les entreprises et les copropriétés au Maroc avec des
            services de qualité en gestion de syndic, intérim, nettoyage et sécurité.
            Notre engagement : l'excellence au service de vos besoins.
          </p>
          <div className="hero__actions">
            <a href="#services" className="btn btn-primary">
              Découvrir nos services
              <FiArrowRight />
            </a>
            <a href="#contact" className="btn btn-outline">
              Nous contacter
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card">
            <img src="/logo.jpg" alt="Logo BNIMTIR GROUPE - Gestion syndic, intérim, nettoyage et sécurité au Maroc" className="hero__logo" width="220" height="auto" />
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">4+</span>
                <span className="hero__stat-label">Domaines d'expertise</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">100%</span>
                <span className="hero__stat-label">Engagement qualité</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
