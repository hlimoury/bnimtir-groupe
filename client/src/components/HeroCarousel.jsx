import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import { carouselImages } from '../i18n/translations';
import './HeroCarousel.css';

const INTERVAL = 6000;

export default function HeroCarousel() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = t.carousel.slides;
  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, total]
  );

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [total]);

  const slide = slides[current];

  return (
    <section className="hero-carousel" aria-label="Présentation BNIMTIR GROUPE">
      <div className="hero-carousel__slides">
        {carouselImages.map((image, index) => (
          <div
            key={image}
            className={`hero-carousel__slide ${index === current ? 'hero-carousel__slide--active' : ''}`}
            aria-hidden={index !== current}
          >
            <img
              src={image}
              alt=""
              className="hero-carousel__image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="hero-carousel__overlay" />
          </div>
        ))}
      </div>

      <div className="hero-carousel__content">
        <div
          className={`hero-carousel__panel ${isTransitioning ? 'hero-carousel__panel--fade' : ''}`}
          key={`${lang}-${current}`}
        >
          <span className="hero-carousel__label">{slide.title}</span>
          <h1 className="hero-carousel__title">{slide.subtitle}</h1>
          <p className="hero-carousel__description">{slide.description}</p>
          <div className="hero-carousel__actions">
            <a href="#services" className="btn btn-primary btn-shine">
              {t.hero.ctaServices}
            </a>
            <a href="#contact" className="btn btn-outline hero-carousel__btn-outline">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
      </div>

      <div className="hero-carousel__controls">
        <button
          type="button"
          className="hero-carousel__arrow"
          onClick={prev}
          aria-label={t.carousel.prev}
        >
          <FiChevronLeft />
        </button>

        <div className="hero-carousel__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`hero-carousel__dot ${index === current ? 'hero-carousel__dot--active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`${t.carousel.goTo} ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-carousel__arrow"
          onClick={next}
          aria-label={t.carousel.next}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
