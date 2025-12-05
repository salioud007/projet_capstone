// src/__tests__/booking.test.js
import { initializeTimes, updateTimes } from '../BookingPage';

// Mock de l'API fetchAPI
global.fetchAPI = jest.fn();
global.submitAPI = jest.fn();

describe('initializeTimes', () => {
  beforeEach(() => {
    fetchAPI.mockClear();
  });

  test('doit appeler fetchAPI avec la date du jour', () => {
    // Arrange
    const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    fetchAPI.mockReturnValue(mockTimes);

    // Act
    const result = initializeTimes();

    // Assert
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/));
    expect(result).toEqual(mockTimes);
    expect(result.length).toBeGreaterThan(0);
  });

  test('doit retourner un tableau non vide', () => {
    // Arrange
    const mockTimes = ['18:00', '19:00', '20:00'];
    fetchAPI.mockReturnValue(mockTimes);

    // Act
    const result = initializeTimes();

    // Assert
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('updateTimes', () => {
  beforeEach(() => {
    fetchAPI.mockClear();
  });

  test('doit appeler fetchAPI avec la date fournie', () => {
    // Arrange
    const selectedDate = '2024-01-15';
    const mockTimes = ['19:00', '20:00', '21:00'];
    fetchAPI.mockReturnValue(mockTimes);

    // Act
    const result = updateTimes(selectedDate);

    // Assert
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(selectedDate);
    expect(result).toEqual(mockTimes);
  });

  test('doit inclure une date présélectionnée', () => {
    // Arrange
    const testDates = [
      { date: '2024-01-15', expected: ['17:00', '18:00'] },
      { date: '2024-01-16', expected: ['19:00', '20:00'] },
      { date: '2024-01-17', expected: ['21:00', '22:00'] }
    ];

    testDates.forEach(({ date, expected }) => {
      fetchAPI.mockReturnValueOnce(expected);
      
      // Act
      const result = updateTimes(date);
      
      // Assert
      expect(fetchAPI).toHaveBeenCalledWith(date);
      expect(result).toEqual(expected);
    });
  });
});

describe('submitAPI', () => {
  test('doit retourner true pour une soumission réussie', () => {
    // Arrange
    const formData = {
      date: '2024-01-15',
      time: '19:00',
      guests: 4,
      occasion: 'Anniversary'
    };
    submitAPI.mockReturnValue(true);

    // Act
    const result = submitAPI(formData);

    // Assert
    expect(submitAPI).toHaveBeenCalledWith(formData);
    expect(result).toBe(true);
  });
});
