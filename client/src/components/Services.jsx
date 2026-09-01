import './Services.css';

const services = [
  {
    image: '/services/gestion-syndic.jpg',
    title: 'Gestion de Syndic',
    alt: 'Gestion de syndic au Maroc - BNIMTIR GROUPE',
    description:
      'Administration complète de vos copropriétés : gestion financière, assemblées générales, entretien des parties communes et suivi des travaux.',
    features: ['Gestion administrative', 'Suivi des charges', 'Relations copropriétaires'],
  },
  {
    image: '/services/interim.jpg',
    title: 'Intérim',
    alt: 'Services d\'intérim au Maroc - BNIMTIR GROUPE',
    description:
      'Mise à disposition de personnel qualifié pour répondre à vos besoins temporaires en renfort, remplacement ou missions ponctuelles.',
    features: ['Personnel qualifié', 'Réactivité', 'Missions courtes et longues'],
  },
  {
    image: '/services/nettoyage.jpg',
    title: 'Nettoyage',
    alt: 'Nettoyage professionnel au Maroc - BNIMTIR GROUPE',
    description:
      'Services de nettoyage professionnel pour bureaux, copropriétés, locaux commerciaux et espaces industriels.',
    features: ['Nettoyage courant', 'Remise en état', 'Entretien régulier'],
  },
  {
    image: '/services/securite.jpg',
    title: 'Sécurité',
    alt: 'Services de sécurité et gardiennage au Maroc - BNIMTIR GROUPE',
    description:
      'Solutions de sécurité pour protéger vos locaux, vos biens et vos collaborateurs avec des agents formés et certifiés.',
    features: ['Gardiennage', 'Surveillance', 'Contrôle d\'accès'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-header">
          <span className="section-tag">Nos services</span>
          <h2 id="services-title" className="section-title">
            Des solutions adaptées à vos besoins
          </h2>
          <p className="section-subtitle">
            BNIMTIR GROUPE propose une gamme complète de services professionnels
            au Maroc pour accompagner les entreprises et les copropriétés au quotidien.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service) => (
            <article key={service.title} className="services__card">
              <div className="services__image-wrapper">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="services__image"
                  loading="lazy"
                  width="400"
                  height="400"
                />
              </div>
              <div className="services__content">
                <h3 className="services__title">{service.title}</h3>
                <p className="services__description">{service.description}</p>
                <ul className="services__features" aria-label={`Avantages ${service.title}`}>
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
