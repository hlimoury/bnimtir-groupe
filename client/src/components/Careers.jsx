import { useState } from 'react';
import { FiUpload, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import AnimateOnScroll from './AnimateOnScroll';
import './Careers.css';

const postes = [
  'Agent de sécurité',
  'Agent de nettoyage',
  'Gestionnaire de syndic',
  'Assistant administratif',
  'Intérimaire (tous secteurs)',
  'Autre',
];

const initialForm = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  poste: '',
  message: '',
};

export default function Careers() {
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
      setStatus({
        type: 'error',
        message: 'Erreur de connexion. Veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="carrieres" className="section careers">
      <div className="container">
        <div className="careers__grid">
          <AnimateOnScroll direction="left" className="careers__info">
            <span className="section-tag">Carrières</span>
            <h2 className="section-title careers__title">
              Rejoignez BNIMTIR GROUPE
            </h2>
            <p className="careers__text">
              Vous souhaitez intégrer une équipe dynamique et professionnelle ?
              BNIMTIR GROUPE recrute régulièrement des profils motivés dans
              différents domaines.
            </p>
            <p className="careers__text">
              Envoyez-nous votre candidature spontanée ou postulez à l'une de nos
              offres. Nous étudions chaque dossier avec attention.
            </p>

            <div className="careers__benefits">
              <h3>Pourquoi nous rejoindre ?</h3>
              <ul>
                <li>Environnement de travail professionnel</li>
                <li>Opportunités d'évolution</li>
                <li>Équipe soudée et bienveillante</li>
                <li>Missions variées et enrichissantes</li>
              </ul>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={150} className="careers__form-wrapper">
            <form className="careers__form" onSubmit={handleSubmit}>
              <h3 className="careers__form-title">Déposer votre candidature</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom *</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    required
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom *</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone *</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    required
                    placeholder="06 00 00 00 00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="poste">Poste recherché *</label>
                <select
                  id="poste"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un poste</option>
                  {postes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Présentez-vous brièvement..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="cv">Votre CV * (PDF, DOC, DOCX - max 5 Mo)</label>
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
                    <span>{cv ? cv.name : 'Choisir un fichier'}</span>
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
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
