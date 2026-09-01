import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

const PHONE = '212532465151';
const MESSAGE = encodeURIComponent(
  'Bonjour, je souhaite obtenir plus d\'informations sur vos services.'
);

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contacter BNIMTIR GROUPE sur WhatsApp au 0532-465151"
      title="WhatsApp — 0532-465151"
    >
      <FaWhatsapp className="whatsapp-float__icon" aria-hidden="true" />
      <span className="whatsapp-float__pulse" aria-hidden="true" />
    </a>
  );
}
