import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './i18n/LanguageContext';
import App from './App';
import './styles/animations.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
