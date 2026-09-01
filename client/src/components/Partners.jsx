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

function PartnerCard({ partner }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="partners__card"
      aria-label={`Visiter ${partner.name}`}
    >
      <img
        src={partner.logo}
        alt={`Logo ${partner.name}`}
        className="partners__logo"
        loading="lazy"
        width="120"
        height="120"
      />
    </a>
  );
}

export default function Partners() {
  const track = [...partners, ...partners];

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

      <div className="partners__wrapper">
        <div className="partners__track">
          {track.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
