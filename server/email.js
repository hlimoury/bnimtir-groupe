const nodemailer = require('nodemailer');

const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'bnimtirservice@gmail.com';
const EMAIL_SECURITY = process.env.EMAIL_SECURITY || 'secubnimtir@gmail.com';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

async function sendEmail({ to, subject, html, attachments = [] }) {
  const mailer = getTransporter();

  if (!mailer) {
    console.warn('Email non configuré : définissez SMTP_USER et SMTP_PASS');
    return { sent: false, reason: 'not_configured' };
  }

  await mailer.sendMail({
    from: `"BNIMTIR GROUPE" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    attachments,
  });

  return { sent: true };
}

function getCandidatureRecipient(poste) {
  if (poste === 'Agent de sécurité') {
    return EMAIL_SECURITY;
  }
  return EMAIL_SERVICE;
}

function buildContactEmail({ nom, email, sujet, message }) {
  return `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Sujet :</strong> ${sujet}</p>
    <p><strong>Message :</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><em>Envoyé depuis le site BNIMTIR GROUPE</em></p>
  `;
}

function buildCandidatureEmail({ nom, prenom, email, telephone, poste, message }) {
  return `
    <h2>Nouvelle candidature</h2>
    <p><strong>Nom :</strong> ${nom} ${prenom}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Téléphone :</strong> ${telephone}</p>
    <p><strong>Poste recherché :</strong> ${poste}</p>
    ${message ? `<p><strong>Message :</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
    <hr>
    <p><em>CV joint en pièce jointe. Envoyé depuis le site BNIMTIR GROUPE</em></p>
  `;
}

module.exports = {
  EMAIL_SERVICE,
  EMAIL_SECURITY,
  sendEmail,
  getCandidatureRecipient,
  buildContactEmail,
  buildCandidatureEmail,
};
