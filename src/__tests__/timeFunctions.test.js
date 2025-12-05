import { initializeTimes, updateTimes, ALL_AVAILABLE_TIMES } from '../utils/times';

describe('Time Functions Unit Tests', () => {
  describe('initializeTimes function', () => {
    test('returns the expected initial times array', () => {
      const result = initializeTimes();
      
      // Vérifie que c'est un tableau
      expect(Array.isArray(result)).toBe(true);
      
      // Vérifie la longueur
      expect(result).toHaveLength(6);
      
      // Vérifie le contenu exact
      expect(result).toEqual([
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
      ]);
      
      // Vérifie que c'est le même tableau que ALL_AVAILABLE_TIMES
      expect(result).toBe(ALL_AVAILABLE_TIMES);
    });
  });
  
  describe('updateTimes function', () => {
    test('returns the same value provided in state for UPDATE_TIMES action', () => {
      // État initial de test
      const initialState = ['17:00', '18:00', '19:00'];
      
      // Action de test
      const action = { 
        type: 'UPDATE_TIMES', 
        date: '2024-01-15' 
      };
      
      const result = updateTimes(initialState, action);
      
      // IMPORTANT : Pour l'instant, la fonction retourne la même valeur
      expect(result).toEqual(initialState);
    });
  });
});
