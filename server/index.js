const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const {
  EMAIL_SERVICE,
  sendEmail,
  getCandidatureRecipient,
  buildContactEmail,
  buildCandidatureEmail,
} = require('./email');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `cv-${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non autorisé. Utilisez PDF, DOC ou DOCX.'));
    }
  },
});

app.use(cors());
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'BNIMTIR GROUPE API' });
});

app.post('/api/candidature', upload.single('cv'), async (req, res) => {
  try {
    const { nom, prenom, email, telephone, poste, message } = req.body;

    if (!nom || !prenom || !email || !telephone || !poste) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez joindre votre CV.',
      });
    }

    const candidature = {
      id: Date.now(),
      nom,
      prenom,
      email,
      telephone,
      poste,
      message: message || '',
      cvFilename: req.file.filename,
      cvOriginalName: req.file.originalname,
      date: new Date().toISOString(),
    };

    const dataPath = path.join(uploadsDir, 'candidatures.json');
    let candidatures = [];
    if (fs.existsSync(dataPath)) {
      candidatures = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    candidatures.push(candidature);
    fs.writeFileSync(dataPath, JSON.stringify(candidatures, null, 2));

    const recipient = getCandidatureRecipient(poste);

    try {
      await sendEmail({
        to: recipient,
        subject: `[BNIMTIR] Candidature - ${poste} - ${prenom} ${nom}`,
        html: buildCandidatureEmail({ nom, prenom, email, telephone, poste, message }),
        attachments: [
          {
            filename: req.file.originalname,
            path: req.file.path,
          },
        ],
      });
    } catch (emailError) {
      console.error('Erreur envoi email candidature:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Votre candidature a été envoyée avec succès. Nous vous contacterons prochainement.',
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { nom, email, sujet, message } = req.body;

    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs.',
      });
    }

    const contact = {
      id: Date.now(),
      nom,
      email,
      sujet,
      message,
      date: new Date().toISOString(),
    };

    const dataPath = path.join(uploadsDir, 'contacts.json');
    let contacts = [];
    if (fs.existsSync(dataPath)) {
      contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    contacts.push(contact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));

    try {
      await sendEmail({
        to: EMAIL_SERVICE,
        subject: `[BNIMTIR] Contact - ${sujet}`,
        html: buildContactEmail({ nom, email, sujet, message }),
      });
    } catch (emailError) {
      console.error('Erreur envoi email contact:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    });
  }
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Le fichier est trop volumineux (max 5 Mo).',
      });
    }
  }
  res.status(400).json({
    success: false,
    message: err.message || 'Erreur lors du traitement de la requête.',
  });
});

if (fs.existsSync(clientDist)) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`BNIMTIR GROUPE server running on port ${PORT}`);
});
