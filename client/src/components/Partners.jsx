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

function PartnerLogo({ partner }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="partners__logo-link"
      aria-label={`Visiter ${partner.name}`}
    >
      <img
        src={partner.logo}
        alt={`Logo ${partner.name}`}
        className="partners__logo"
        loading="lazy"
        width="100"
        height="100"
      />
    </a>
  );
}

function PartnerStrip({ items, ariaHidden = false }) {
  return (
    <div className="partners__strip" aria-hidden={ariaHidden}>
      {items.map((partner, index) => (
        <PartnerLogo key={`${partner.name}-${index}`} partner={partner} />
      ))}
    </div>
  );
}

export default function Partners() {
  const stripItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section id="partenaires" className="section partners" aria-labelledby="partners-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">Nos partenaires</span>
          <h2 id="partners-title" className="section-title">
            Ils nous font confiance
          </h2>
          <p className="section-subtitle">
            BNIMTIR GROUPE collabore avec des entreprises de renom au Maroc.
          </p>
        </header>
      </div>

      <div className="partners__marquee">
        <div className="partners__marquee-inner">
          <PartnerStrip items={stripItems} />
          <PartnerStrip items={stripItems} ariaHidden />
        </div>
      </div>
    </section>
  );
}
