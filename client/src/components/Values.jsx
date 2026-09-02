import { FiAward, FiHeart, FiTarget, FiZap } from 'react-icons/fi';
import AnimateOnScroll from './AnimateOnScroll';
import { useLanguage } from '../i18n/LanguageContext';
import './Values.css';

const icons = [FiAward, FiHeart, FiTarget, FiZap];

export default function Values() {
  const { t } = useLanguage();

  return (
    <section className="section values">
      <div className="container">
        <AnimateOnScroll direction="up">
          <div className="section-header">
            <span className="section-tag">{t.values.tag}</span>
            <h2 className="section-title">{t.values.title}</h2>
            <p className="section-subtitle">{t.values.subtitle}</p>
          </div>
        </AnimateOnScroll>

        <div className="values__grid">
          {t.values.items.map((value, index) => {
            const Icon = icons[index];
            return (
              <AnimateOnScroll key={value.title} delay={index * 100} direction="scale">
                <div className="values__card">
                  <div className="values__icon">
                    <Icon />
                  </div>
                  <h3 className="values__title">{value.title}</h3>
                  <p className="values__description">{value.description}</p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
