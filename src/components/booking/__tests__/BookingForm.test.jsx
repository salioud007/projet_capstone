import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingForm from '../BookingForm';

const mockAvailableTimes = ['17:00', '18:00', '19:00'];
const mockHandleDateChange = jest.fn();

test('Renders static text in BookingForm', () => {
  render(
    <BookingForm 
      availableTimes={mockAvailableTimes}
      handleDateChange={mockHandleDateChange}
    />
  );
  
  // Teste les labels statiques
  expect(screen.getByText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByText(/occasion/i)).toBeInTheDocument();
  expect(screen.getByText(/make your reservation/i)).toBeInTheDocument();
});
