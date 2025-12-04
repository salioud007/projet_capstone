import React from 'react';
import Head from './components/Head';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Head />  {/* Ajouter ici */}
      <Header />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}

export default App;