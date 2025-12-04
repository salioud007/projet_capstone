import React from 'react';

const Main = () => {
  return (
    <main style={styles.main}>
      <section style={styles.section}>
        <h2>Bienvenue sur mon projet React</h2>
        <p>Ceci est le contenu principal de l'application.</p>
        <p>Ce projet utilise React avec Vite et suit les bonnes pratiques de développement.</p>
      </section>
      
      <section style={styles.section}>
        <h3>Fonctionnalités</h3>
        <ul>
          <li>Composants React modulaires</li>
          <li>Structure sémantique HTML5</li>
          <li>Styles en ligne</li>
          <li>Architecture propre</li>
        </ul>
      </section>
    </main>
  );
};

const styles = {
  main: {
    minHeight: 'calc(100vh - 200px)',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

export default Main;