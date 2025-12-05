import React, { useState } from 'react';

const BookingForm = ({ availableTimes, handleDateChange }) => {
  // États pour chaque champ
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  // Gestionnaire pour le changement de date
  const handleDateChangeLocal = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    
    // Appeler la fonction du parent pour mettre à jour les heures
    if (handleDateChange) {
      handleDateChange(selectedDate);
    }
  };

  // Gestionnaire de soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Reservation Details:', {
      date,
      time,
      guests,
      occasion
    });
    
    alert('Reservation submitted! Check the console for details.');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Date Field */}
      <div className='form-group'>
        <label htmlFor='res-date'>Choose date</label>
        <input 
          type='date' 
          id='res-date' 
          value={date}
          onChange={handleDateChangeLocal}
          required
        />
      </div>

      {/* Time Field */}
      <div className='form-group'>
        <label htmlFor='res-time'>Choose time</label>
        <select 
          id='res-time' 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          {availableTimes.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
      </div>

      {/* Guests Field */}
      <div className='form-group'>
        <label htmlFor='guests'>Number of guests</label>
        <input 
          type='number' 
          id='guests' 
          placeholder='1' 
          min='1' 
          max='10' 
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          required
        />
      </div>

      {/* Occasion Field */}
      <div className='form-group'>
        <label htmlFor='occasion'>Occasion</label>
        <select 
          id='occasion' 
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value='Birthday'>Birthday</option>
          <option value='Anniversary'>Anniversary</option>
          <option value='Business'>Business</option>
          <option value='Date'>Date</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <input 
        type='submit' 
        value='Make Your Reservation'
        className='submit-button'
      />
    </form>
  );
};

export default BookingForm;
