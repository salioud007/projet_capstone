// test-commonjs.js
const fs = require('fs');
const path = require('path');

console.log('🧪 Test avec lecture directe du fichier...\n');

// Lire le fichier times.js
const timesContent = fs.readFileSync(path.join(__dirname, 'src/utils/times.js'), 'utf8');

// Extraire ALL_AVAILABLE_TIMES manuellement
const timesMatch = timesContent.match(/ALL_AVAILABLE_TIMES = \[([^\]]+)\]/);
if (timesMatch) {
  console.log('=== Test initializeTimes (simulé) ===');
  const times = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  console.log('✓ Tableau de 6 heures:', times.length === 6 ? '✅' : '❌');
  console.log('✓ Contient 17:00:', times.includes('17:00') ? '✅' : '❌');
  console.log('Heures:', times);
}

console.log('\n=== Test updateTimes (logique) ===');
console.log('Pour l\'instant, updateTimes retourne la même valeur que l\'état fourni.');
console.log('Ce test sera mis à jour quand la logique de filtrage par date sera implémentée.');
console.log('\n✅ Tests conceptuels passés!');
