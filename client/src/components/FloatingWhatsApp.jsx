import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import './FloatingWhatsApp.css';

const PHONE = '212532465151';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const message = encodeURIComponent(t.common.whatsappMsg);

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={t.common.whatsapp}
      title="WhatsApp — 0532-465151"
    >
      <FaWhatsapp className="whatsapp-float__icon" aria-hidden="true" />
      <span className="whatsapp-float__pulse" aria-hidden="true" />
    </a>
  );
}
