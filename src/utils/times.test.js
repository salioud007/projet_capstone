import { initializeTimes, updateTimes, ALL_AVAILABLE_TIMES } from './times.js';

// Test 1: initializeTimes
test('initializeTimes returns correct expected value', () => {
  const result = initializeTimes();
  
  // Vérifie le type et la longueur
  expect(Array.isArray(result)).toBe(true);
  expect(result).toHaveLength(6);
  
  // Vérifie le contenu
  expect(result).toEqual(ALL_AVAILABLE_TIMES);
  expect(result).toBe(ALL_AVAILABLE_TIMES); // Même référence
});

// Test 2: updateTimes
test('updateTimes returns same value provided in state', () => {
  const initialState = ['17:00', '18:00', '19:00'];
  const action = { 
    type: 'UPDATE_TIMES', 
    date: '2024-01-15' 
  };
  
  const result = updateTimes(initialState, action);
  
  // Doit retourner la même valeur (pour l'instant)
  expect(result).toEqual(initialState);
});
