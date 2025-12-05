import React from 'react';
import BookingForm from '../components/booking/BookingForm';

const BookingPage = ({ availableTimes, handleDateChange }) => {
  return (
    <main className='main'>
      <div className='container'>
        <section className='booking-page'>
          <h1 className='booking-title'>Make a Reservation</h1>
          <p className='booking-subtitle'>Reserve your table at Little Lemon</p>
          
          <div className='booking-form-container'>
            <BookingForm 
              availableTimes={availableTimes}
              handleDateChange={handleDateChange}
            />
          </div>
          
          <div className='booking-info'>
            <h3>Important Information</h3>
            <ul>
              <li>Reservations can be made up to 60 days in advance</li>
              <li>Maximum party size: 10 guests</li>
              <li>Please arrive 10 minutes before your reservation</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookingPage;
