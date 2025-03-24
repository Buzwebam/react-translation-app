import React from 'react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="landing-page">
      <nav className="language-switcher">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
      </nav>
      
      <header className="hero">
        <h1>{t('welcome')}</h1>
      </header>

      <main>
        <section className="section">
          <h2>{t('about')}</h2>
          {/* Add your content here */}
        </section>

        <section className="section">
          <h2>{t('services')}</h2>
          {/* Add your content here */}
        </section>

        <section className="section">
          <h2>{t('contact')}</h2>
          {/* Add your contact form here */}
        </section>
      </main>
    </div>
  );
};

export default LandingPage; 