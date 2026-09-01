import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';
import './Contact.css';

const PHONE = '0532-465151';
const PHONE_LINK = 'tel:+212532465151';

const initialForm = {
  nom: '',
  email: '',
  sujet: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setForm(initialForm);
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Erreur de connexion. Veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <AnimateOnScroll direction="up">
          <header className="section-header">
            <span className="section-tag">Contact</span>
            <h2 id="contact-title" className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">
              Une question, un projet ? N'hésitez pas à nous contacter. Notre équipe
              au Maroc vous répondra dans les plus brefs délais.
            </p>
          </header>
        </AnimateOnScroll>

        <div className="contact__grid">
          <AnimateOnScroll direction="left" delay={100}>
            <address className="contact__info">
            <div className="contact__card">
              <FiMail className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Email</h3>
                <a href="mailto:bnimtirservice@gmail.com">bnimtirservice@gmail.com</a>
              </div>
            </div>

            <div className="contact__card">
              <FiPhone className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Téléphone</h3>
                <a href={PHONE_LINK}>{PHONE}</a>
              </div>
            </div>

            <div className="contact__card">
              <FiMapPin className="contact__icon" aria-hidden="true" />
              <div>
                <h3>Localisation</h3>
                <p>Maroc</p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/groupe-b-83b3692a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__linkedin"
              aria-label="Suivez BNIMTIR GROUPE sur LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
              Suivez-nous sur LinkedIn
            </a>
          </address>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={200}>
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="contact-nom">Nom complet *</label>
              <input
                type="text"
                id="contact-nom"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email *</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                inputMode="email"
                placeholder="votre@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-sujet">Sujet *</label>
              <input
                type="text"
                id="contact-sujet"
                name="sujet"
                value={form.sujet}
                onChange={handleChange}
                required
                placeholder="Objet de votre message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Votre message..."
              />
            </div>

            {status && (
              <div className={`form-status form-status--${status.type}`} role="alert">
                {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                {status.message}
              </div>
            )}

            <button type="submit" className="btn btn-primary contact__submit" disabled={loading}>
              <FiSend aria-hidden="true" />
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
