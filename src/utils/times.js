// Toutes les heures disponibles (simulation de données)
export const ALL_AVAILABLE_TIMES = [
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

// Fonction pour initialiser les heures disponibles
export function initializeTimes() {
  return ALL_AVAILABLE_TIMES;
}

// Fonction pour filtrer les heures selon la date
function filterTimesByDate(date) {
  // Pour l'instant, retourne toutes les heures
  // Plus tard, on pourra :
  // 1. Vérifier si c'est un weekend (plus d'heures)
  // 2. Vérifier les réservations existantes
  // 3. Appeler une API
  return ALL_AVAILABLE_TIMES;
}

// Fonction réductrice pour mettre à jour les heures
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      // Filtrer les heures selon la date sélectionnée
      return filterTimesByDate(action.date);
    case 'RESET_TIMES':
      // Réinitialiser aux heures par défaut
      return ALL_AVAILABLE_TIMES;
    default:
      return state;
  }
}
