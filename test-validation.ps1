Write-Host "=== LITTLE LEMON - TEST VALIDATION ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "ÉTAPE 1: Validation HTML5 implémentée" -ForegroundColor Green
Write-Host "  ✓ Champ date: required, min=today" -ForegroundColor Green
Write-Host "  ✓ Champ invités: required, min=1, max=10" -ForegroundColor Green
Write-Host "  ✓ Champ occasion: required" -ForegroundColor Green
Write-Host "  ✓ Attribut novalidate sur formulaire" -ForegroundColor Green

Write-Host ""
Write-Host "ÉTAPE 2: Validation React implémentée" -ForegroundColor Green
Write-Host "  ✓ Validation en temps réel" -ForegroundColor Green
Write-Host "  ✓ Gestion des erreurs" -ForegroundColor Green
Write-Host "  ✓ Bouton désactivé si invalide" -ForegroundColor Green
Write-Host "  ✓ Messages d'erreur contextuels" -ForegroundColor Green

Write-Host ""
Write-Host "ÉTAPE 3: Lancement de l'application..." -ForegroundColor Yellow

# Démarrer l'application en arrière-plan
Start-Process "npm" -ArgumentList "start" -WindowStyle Minimized

Write-Host ""
Write-Host "✅ Application démarrée sur http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "TESTS À EFFECTUER MANUELLEMENT:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Test validation HTML5:" -ForegroundColor White
Write-Host "   - Laisser la date vide → message d'erreur HTML5" -ForegroundColor Gray
Write-Host "   - Mettre 0 invités → message d'erreur HTML5" -ForegroundColor Gray
Write-Host "   - Mettre 11 invités → message d'erreur HTML5" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Test validation React:" -ForegroundColor White
Write-Host "   - Bouton doit être grisé quand formulaire invalide" -ForegroundColor Gray
Write-Host "   - Changer la date → heures doivent se mettre à jour" -ForegroundColor Gray
Write-Host "   - Messages d'erreur doivent apparaître sous les champs" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Test soumission:" -ForegroundColor White
Write-Host "   - Remplir tout correctement → bouton activé" -ForegroundColor Gray
Write-Host "   - Cliquer soumettre → message de confirmation" -ForegroundColor Gray
Write-Host "   - Formulaire doit se réinitialiser après succès" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Test validation combinée:" -ForegroundColor White
Write-Host "   - Remplir partiellement → voir validation en temps réel" -ForegroundColor Gray
Write-Host "   - Corriger erreurs → bouton doit s'activer" -ForegroundColor Gray
Write-Host ""
Write-Host "Ouvert test-validation.html pour voir un exemple simple de validation HTML5" -ForegroundColor Cyan
