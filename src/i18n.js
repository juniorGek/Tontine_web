// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Les traductions
const resources = {
  fr: {
    translation: {
      welcome: "Bienvenue",
      goodbye: "Au revoir",
    },
  },
  en: {
    translation: {
      welcome: "Welcome",
      goodbye: "Goodbye",
    },
  },
};

// Configuration i18next
i18n
  .use(LanguageDetector) // Détection automatique de la langue du navigateur
  .use(initReactI18next) // Pour l'intégration avec React
  .init({
    resources, // Fichiers de traductions
    fallbackLng: 'fr', // Langue par défaut
    interpolation: {
      escapeValue: false, // Pas besoin d'échapper les valeurs pour React
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], // Méthode de détection de la langue
    },
  });

export default i18n;
