import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import { updateTimes, initializeTimes } from './utils/times';
import './App.css';

function App() {
  // Utiliser useReducer pour gérer les heures disponibles
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  // Fonction pour mettre à jour les heures quand la date change
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
    } else {
      dispatch({ type: 'RESET_TIMES' });
    }
  };

  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route 
          path='/' 
          element={<HomePage />} 
        />
        <Route 
          path='/booking' 
          element={
            <BookingPage 
              availableTimes={availableTimes}
              handleDateChange={handleDateChange}
            />
          } 
        />
        <Route 
          path='/reservations' 
          element={
            <BookingPage 
              availableTimes={availableTimes}
              handleDateChange={handleDateChange}
            />
          } 
        />
        <Route path='/about' element={<div>About Page (Coming Soon)</div>} />
        <Route path='/menu' element={<div>Menu Page (Coming Soon)</div>} />
        <Route path='/order' element={<div>Order Online (Coming Soon)</div>} />
        <Route path='/login' element={<div>Login (Coming Soon)</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
