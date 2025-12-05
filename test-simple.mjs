// test-simple.js - Test manuel sans Jest
async function runTests() {
  console.log('🧪 Début des tests...\n');
  
  try {
    // Dynamic import pour ES6 modules
    const { initializeTimes, updateTimes, ALL_AVAILABLE_TIMES } = await import('./src/utils/times.js');
    
    // Test 1: initializeTimes
    console.log('=== Test 1: initializeTimes ===');
    const times = initializeTimes();
    const test1Pass = Array.isArray(times) && 
                     times.length === 6 && 
                     times[0] === '17:00' &&
                     times === ALL_AVAILABLE_TIMES;
    console.log('✓ Retourne un tableau:', Array.isArray(times));
    console.log('✓ Longueur 6:', times.length === 6);
    console.log('✓ Première heure 17:00:', times[0] === '17:00');
    console.log('✓ Même référence que ALL_AVAILABLE_TIMES:', times === ALL_AVAILABLE_TIMES);
    console.log('Résultat:', test1Pass ? '✅ PASS' : '❌ FAIL');
    
    // Test 2: updateTimes
    console.log('\n=== Test 2: updateTimes ===');
    const initialState = ['17:00', '18:00', '19:00'];
    const action = { type: 'UPDATE_TIMES', date: '2024-01-01' };
    const result = updateTimes(initialState, action);
    const test2Pass = JSON.stringify(result) === JSON.stringify(initialState);
    console.log('✓ Retourne la même valeur que l\'état:', test2Pass);
    console.log('État initial:', initialState);
    console.log('Résultat:', result);
    console.log('Résultat:', test2Pass ? '✅ PASS' : '❌ FAIL');
    
    // Résumé
    console.log('\n=== RÉSUMÉ ===');
    console.log(Tests passés: );
    console.log(test1Pass && test2Pass ? '🎉 Tous les tests passent!' : '❌ Certains tests échouent');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Exécuter si en module ES6
if (import.meta.url) {
  runTests();
}
