import { useState } from 'react';
import { FiUpload, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import AnimateOnScroll from './AnimateOnScroll';
import { useLanguage } from '../i18n/LanguageContext';
import './Careers.css';

const initialForm = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  poste: '',
  message: '',
};

export default function Careers() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [cv, setCv] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCv(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (cv) formData.append('cv', cv);

    try {
      const res = await fetch('/api/candidature', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setForm(initialForm);
        setCv(null);
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch {
      setStatus({ type: 'error', message: t.common.connectionError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="carrieres" className="section careers">
      <div className="container">
        <div className="careers__grid">
          <AnimateOnScroll direction="left" className="careers__info">
            <span className="section-tag">{t.careers.tag}</span>
            <h2 className="section-title careers__title">{t.careers.title}</h2>
            <p className="careers__text">{t.careers.text1}</p>
            <p className="careers__text">{t.careers.text2}</p>

            <div className="careers__benefits">
              <h3>{t.careers.benefitsTitle}</h3>
              <ul>
                {t.careers.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={150} className="careers__form-wrapper">
            <form className="careers__form" onSubmit={handleSubmit}>
              <h3 className="careers__form-title">{t.careers.formTitle}</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">{t.careers.firstName} *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    placeholder={t.careers.placeholders.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">{t.careers.lastName} *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder={t.careers.placeholders.lastName}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t.careers.email} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder={t.careers.placeholders.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">{t.careers.phone} *</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    required
                    placeholder={t.careers.placeholders.phone}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="poste">{t.careers.position} *</label>
                <select
                  id="poste"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t.careers.selectPosition}</option>
                  {t.careers.positions.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.careers.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={t.careers.placeholders.message}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cv">{t.careers.cv}</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="file-upload__label">
                    <FiUpload />
                    <span>{cv ? cv.name : t.careers.chooseFile}</span>
                  </div>
                </div>
              </div>

              {status && (
                <div className={`form-status form-status--${status.type}`}>
                  {status.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                  {status.message}
                </div>
              )}

              <button type="submit" className="btn btn-primary careers__submit" disabled={loading}>
                <FiSend />
                {loading ? t.careers.sending : t.careers.submit}
              </button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
