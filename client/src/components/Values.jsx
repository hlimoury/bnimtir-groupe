import { FiAward, FiHeart, FiTarget, FiZap } from 'react-icons/fi';
import './Values.css';

const values = [
  {
    icon: FiAward,
    title: 'Excellence',
    description: 'Nous visons la qualité dans chaque prestation que nous réalisons.',
  },
  {
    icon: FiHeart,
    title: 'Proximité',
    description: 'Une relation de confiance et un accompagnement personnalisé.',
  },
  {
    icon: FiTarget,
    title: 'Engagement',
    description: 'Nous nous engageons pleinement envers nos clients et collaborateurs.',
  },
  {
    icon: FiZap,
    title: 'Réactivité',
    description: 'Une équipe disponible pour répondre rapidement à vos demandes.',
  },
];

export default function Values() {
  return (
    <section className="section values">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Nos valeurs</span>
          <h2 className="section-title">Ce qui nous définit</h2>
          <p className="section-subtitle">
            Des valeurs fortes qui guident notre action au quotidien et font de
            BNIMTIR GROUPE un partenaire de confiance.
          </p>
        </div>

        <div className="values__grid">
          {values.map((value) => (
            <div key={value.title} className="values__card">
              <div className="values__icon">
                <value.icon />
              </div>
              <h3 className="values__title">{value.title}</h3>
              <p className="values__description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
