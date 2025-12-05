// Test des fonctions exportées depuis App.jsx
import { initializeTimes, updateTimes } from './App';

describe('Time Functions Tests', () => {
  // Test 1 : initializeTimes
  test('initializeTimes returns correct initial value', () => {
    const result = initializeTimes();
    
    // Vérifie que c'est un tableau
    expect(Array.isArray(result)).toBe(true);
    
    // Vérifie qu'il contient des heures
    expect(result.length).toBeGreaterThan(0);
    
    // Vérifie des heures spécifiques (selon ton implémentation)
    expect(result).toContain('17:00');
    expect(result).toContain('18:00');
  });
  
  // Test 2 : updateTimes
  test('updateTimes returns same value provided in state', () => {
    // État initial
    const initialState = ['19:00', '20:00', '21:00'];
    
    // Action (date sélectionnée)
    const action = { 
      type: 'UPDATE_TIMES', 
      date: '2024-01-01' 
    };
    
    const result = updateTimes(initialState, action);
    
    // Doit retourner la même valeur pour l'instant
    expect(result).toEqual(initialState);
  });
});
