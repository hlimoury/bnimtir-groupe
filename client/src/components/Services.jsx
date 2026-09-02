import AnimateOnScroll from './AnimateOnScroll';
import { useLanguage } from '../i18n/LanguageContext';
import { carouselImages } from '../i18n/translations';
import './Services.css';

const serviceImages = [
  '/services/gestion-syndic.jpg',
  '/services/interim.jpg',
  '/services/nettoyage.jpg',
  '/services/securite.jpg',
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="services__decor" />
      <div className="container">
        <AnimateOnScroll direction="up">
          <header className="section-header">
            <span className="section-tag">{t.services.tag}</span>
            <h2 id="services-title" className="section-title">
              {t.services.title}
            </h2>
            <p className="section-subtitle">{t.services.subtitle}</p>
          </header>
        </AnimateOnScroll>

        <div className="services__grid">
          {t.services.items.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 120} direction="up">
              <article className="services__card">
                <div className="services__image-wrapper">
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    className="services__image"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="services__content">
                  <h3 className="services__title">{service.title}</h3>
                  <p className="services__description">{service.description}</p>
                  <ul className="services__features" aria-label={service.title}>
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
