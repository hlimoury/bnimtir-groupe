# BNIMTIR GROUPE - Site Vitrine

Site web vitrine pour **BNIMTIR GROUPE** — gestion de syndic, intérim, nettoyage et sécurité au Maroc.

## Stack technique

- **Frontend** : React.js + Vite
- **Backend** : Node.js + Express + Nodemailer
- **Déploiement** : Render

## Emails configurés

| Formulaire | Destination |
|---|---|
| Contact | `bnimtirservice@gmail.com` |
| Candidature (général) | `bnimtirservice@gmail.com` |
| Candidature Agent de sécurité | `secubnimtir@gmail.com` |

---

## Déploiement sur Render (étape par étape)

### Étape 1 — Préparer Gmail pour l'envoi d'emails

1. Connectez-vous à `bnimtirservice@gmail.com`
2. Activez la **validation en 2 étapes** : [myaccount.google.com/security](https://myaccount.google.com/security)
3. Créez un **mot de passe d'application** :
   - Allez dans Sécurité → Mots de passe des applications
   - Choisissez "Autre" → nommez-le "BNIMTIR Site"
   - Copiez le mot de passe généré (16 caractères)

### Étape 2 — Pousser le code sur GitHub

```bash
cd Bnimtir
git init
git add .
git commit -m "Site vitrine BNIMTIR GROUPE"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/bnimtir-groupe.git
git push -u origin main
```

### Étape 3 — Créer le service sur Render

1. Allez sur [render.com](https://render.com) et créez un compte
2. Cliquez **New +** → **Web Service**
3. Connectez votre compte GitHub et sélectionnez le repo `bnimtir-groupe`
4. Configurez :

| Paramètre | Valeur |
|---|---|
| **Name** | `bnimtir-groupe` |
| **Region** | Frankfurt (EU) ou le plus proche |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### Étape 4 — Variables d'environnement

Dans **Environment** → **Add Environment Variable**, ajoutez :

| Clé | Valeur |
|---|---|
| `SMTP_USER` | `bnimtirservice@gmail.com` |
| `SMTP_PASS` | `votre_mot_de_passe_application` |
| `EMAIL_SERVICE` | `bnimtirservice@gmail.com` |
| `EMAIL_SECURITY` | `secubnimtir@gmail.com` |
| `NODE_ENV` | `production` |

### Étape 5 — Déployer

1. Cliquez **Create Web Service**
2. Render va builder et déployer automatiquement (2-5 minutes)
3. Votre site sera accessible à : `https://bnimtir-groupe.onrender.com`

### Étape 6 — Mettre à jour l'URL (après déploiement)

Remplacez `bnimtir-groupe.onrender.com` par votre vraie URL Render dans :
- `client/public/sitemap.xml`
- `client/public/robots.txt`
- `client/src/components/Seo.jsx`

Puis re-déployez (push sur GitHub → Render redéploie automatiquement).

---

## Installation locale

```bash
# Installer les dépendances
npm install
cd client && npm install && cd ..

# Créer le fichier .env (copier depuis .env.example)
cp .env.example .env
# Remplir SMTP_USER et SMTP_PASS

# Terminal 1 - Serveur API
node server/index.js

# Terminal 2 - Frontend React
cd client && npm run dev
```

- Frontend : `http://localhost:5173`
- API : `http://localhost:3000`

## Build de production

```bash
npm run build
npm start
```

## Structure du projet

```
bnimtir/
├── client/              # Application React
│   ├── public/
│   │   ├── services/    # Images des services
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   └── src/
├── server/
│   ├── index.js         # API Express
│   ├── email.js         # Envoi d'emails
│   └── uploads/         # CV et données soumises
├── .env.example
├── render.yaml
└── package.json
```

## API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Vérification du serveur |
| POST | `/api/candidature` | Candidature + CV (email automatique) |
| POST | `/api/contact` | Formulaire de contact (email automatique) |

## Notes importantes

- Les formulaires sauvegardent aussi les données localement dans `server/uploads/`
- Formats CV acceptés : PDF, DOC, DOCX (max 5 Mo)
- Sur le plan gratuit Render, le site peut mettre ~30s à démarrer après inactivité
- Pour un domaine personnalisé (ex: `bnimtir.ma`), ajoutez-le dans Render → Settings → Custom Domains
