import AnimateOnScroll from './AnimateOnScroll';
import { useLanguage } from '../i18n/LanguageContext';
import './Partners.css';

const partners = [
  {
    name: 'Marjane Market',
    logo: '/partners/marjane-market.png',
    url: 'https://www.marjane.ma/marjane-market/cette-semaine-chez-marjane-market',
  },
  {
    name: 'Marjane',
    logo: '/partners/marjane.png',
    url: 'https://www.marjane.ma/marjane/cette-semaine-chez-marjane',
  },
  {
    name: 'Marjane City',
    logo: '/partners/marjane-city.png',
    url: 'https://www.marjane.ma/marjane/cette-semaine-chez-marjane',
  },
  {
    name: 'Electroplanet',
    logo: '/partners/electroplanet.png',
    url: 'https://www.electroplanet.ma/',
  },
];

const stripItems = [...partners, ...partners, ...partners, ...partners];

function PartnerLogo({ partner, visitLabel }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="partners__logo-link"
      aria-label={`${visitLabel} ${partner.name}`}
    >
      <img
        src={partner.logo}
        alt={`Logo ${partner.name}`}
        className="partners__logo"
        loading="eager"
        decoding="async"
        width="100"
        height="100"
      />
    </a>
  );
}

function PartnerStrip({ items, visitLabel, ariaHidden = false }) {
  return (
    <div className="partners__strip" aria-hidden={ariaHidden ? 'true' : undefined}>
      {items.map((partner, index) => (
        <PartnerLogo
          key={`${partner.name}-${index}`}
          partner={partner}
          visitLabel={visitLabel}
        />
      ))}
    </div>
  );
}

export default function Partners() {
  const { t } = useLanguage();

  return (
    <section id="partenaires" className="section partners" aria-labelledby="partners-title">
      <div className="container">
        <AnimateOnScroll direction="up">
          <header className="section-header">
            <span className="section-tag">{t.partners.tag}</span>
            <h2 id="partners-title" className="section-title">
              {t.partners.title}
            </h2>
            <p className="section-subtitle">{t.partners.subtitle}</p>
          </header>
        </AnimateOnScroll>
      </div>

      <div className="partners__marquee" dir="ltr">
        <div className="partners__marquee-inner">
          <PartnerStrip items={stripItems} visitLabel={t.partners.visit} />
          <PartnerStrip items={stripItems} visitLabel={t.partners.visit} ariaHidden />
        </div>
      </div>
    </section>
  );
}
