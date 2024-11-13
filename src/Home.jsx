import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams(); // Récupère la langue depuis l'URL
  const navigate = useNavigate();

  // Utilise la langue de l'URL pour configurer i18n
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang); // Change la langue dans i18next
    }
  }, [lang, i18n]);

  // Fonction pour changer de langue et mettre à jour l'URL
  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // Change la langue dans i18n
    navigate(`/home/${language}`); // Met à jour l'URL avec la nouvelle langue
  };

  return (
    <div>
      <h1>{t('welcome')}</h1> {/* Utilise la traduction */}
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
}

export default Home;
