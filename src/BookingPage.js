// src/BookingPage.js
import React, { useState, useEffect, useRef } from 'react';

// Fonction de validation exportée pour les tests
export const validateForm = (date, time, guests, occasion) => {
  const errors = {};
  
  if (!date) errors.date = 'La date est requise';
  if (!time) errors.time = "L'heure est requise";
  if (!guests || guests < 1 || guests > 10) errors.guests = 'Nombre invités invalide (1-10)';
  if (!occasion) errors.occasion = "L'occasion est requise";
  
  return errors;
};

// Fonction initializeTimes
export const initializeTimes = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  return window.fetchAPI ? window.fetchAPI(todayString) : ['17:00', '18:00', '19:00'];
};

// Fonction updateTimes
export const updateTimes = (selectedDate) => {
  return window.fetchAPI ? window.fetchAPI(selectedDate) : ['17:00', '18:00', '19:00'];
};

function BookingPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('Birthday');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Références pour le focus - ÉTAPE 1: Sémantique améliorée
  const dateInputRef = useRef(null);
  const timeSelectRef = useRef(null);
  const guestsInputRef = useRef(null);
  const occasionSelectRef = useRef(null);
  const submitButtonRef = useRef(null);
  const formRef = useRef(null);

  // Initialisation
  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    setDate(todayString);
    const initialTimes = initializeTimes();
    setAvailableTimes(initialTimes);
    if (initialTimes.length > 0) {
      setTime(initialTimes[0]);
    }
    
    // Focus sur le premier champ au chargement
    if (dateInputRef.current) {
      dateInputRef.current.focus();
    }
  }, []);

  // Validation à chaque changement
  useEffect(() => {
    const formErrors = validateForm(date, time, parseInt(guests) || 0, occasion);
    setErrors(formErrors);
  }, [date, time, guests, occasion]);

  // Gestion changement date
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setTouched({...touched, date: true});
    
    const newTimes = updateTimes(selectedDate);
    setAvailableTimes(newTimes);
    
    if (newTimes.length > 0 && !newTimes.includes(time)) {
      setTime(newTimes[0]);
    } else if (newTimes.length === 0) {
      setTime('');
    }
  };

  // Gestion changement guests
  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setGuests(value);
    setTouched({...touched, guests: true});
  };

  // Gestion changement occasion
  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
    setTouched({...touched, occasion: true});
  };

  // Gestion blur
  const handleBlur = (field) => {
    setTouched({...touched, [field]: true});
  };

  // Gestion clavier - navigation accessible
  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === 'Enter' && nextFieldRef && nextFieldRef.current) {
      e.preventDefault();
      nextFieldRef.current.focus();
    }
  };

  // Vérifier si le formulaire est valide
  const isFormValid = Object.keys(errors).length === 0;

  // Gestion soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Marquer tous les champs comme touchés
    setTouched({
      date: true,
      time: true,
      guests: true,
      occasion: true
    });
    
    if (!isFormValid) {
      setIsSubmitting(false);
      // Focus sur le premier champ en erreur
      if (errors.date && dateInputRef.current) {
        dateInputRef.current.focus();
      } else if (errors.time && timeSelectRef.current) {
        timeSelectRef.current.focus();
      } else if (errors.guests && guestsInputRef.current) {
        guestsInputRef.current.focus();
      } else if (errors.occasion && occasionSelectRef.current) {
        occasionSelectRef.current.focus();
      }
      return;
    }
    
    const formData = {
      date: date,
      time: time,
      guests: parseInt(guests),
      occasion: occasion
    };
    
    try {
      const isSuccess = window.submitAPI ? window.submitAPI(formData) : true;
      
      if (isSuccess) {
        // ÉTAPE 2: ARIA live region pour annoncer le succès
        const successMessage = 'Réservation confirmée avec succès!';
        alert('✅ ' + successMessage);
        
        // Réinitialiser
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        setDate(todayString);
        const initialTimes = initializeTimes();
        setAvailableTimes(initialTimes);
        setTime(initialTimes[0] || '');
        setGuests('1');
        setOccasion('Birthday');
        setTouched({});
        
        // Focus sur le formulaire après réinitialisation
        if (formRef.current) {
          formRef.current.focus();
        }
      } else {
        alert('❌ Erreur lors de la réservation');
      }
    } catch (error) {
      alert('❌ Erreur: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ÉTAPE 1: Balisage sémantique amélioré
    <main id="main-content" tabIndex="-1" aria-label="Formulaire de réservation Little Lemon">
      <article className="booking-article" aria-labelledby="booking-title">
        <header>
          <h1 id="booking-title" className="visually-hidden">Réservation Little Lemon</h1>
          <h2>Réserver une table</h2>
          <p className="lead-text">
            Remplissez le formulaire ci-dessous pour réserver une table au restaurant Little Lemon.
          </p>
        </header>
        
        {/* ÉTAPE 3: Formulaire étiqueté correctement */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          noValidate 
          data-testid="booking-form"
          aria-labelledby="booking-title"
          role="form"
        >
          {/* Section Date */}
          <fieldset aria-labelledby="date-legend">
            <legend id="date-legend" className="visually-hidden">Informations de date et heure</legend>
            
            <div className="form-group">
              {/* ÉTAPE 3: Label avec htmlFor correspondant à l'id */}
              <label htmlFor="res-date" id="date-label">
                Date de réservation <span aria-hidden="true">*</span>
                <span className="visually-hidden"> (requis)</span>
              </label>
              
              <input
                ref={dateInputRef}
                type="date"
                id="res-date"
                name="res-date"
                value={date}
                onChange={handleDateChange}
                onBlur={() => handleBlur('date')}
                onKeyDown={(e) => handleKeyDown(e, timeSelectRef)}
                min={new Date().toISOString().split('T')[0]}
                required
                aria-required="true"
                aria-labelledby="date-label"
                aria-describedby={errors.date && touched.date ? "date-error" : "date-hint"}
                aria-invalid={errors.date && touched.date ? "true" : "false"}
                data-testid="date-input"
                className={errors.date && touched.date ? 'input-error' : ''}
              />
              
              {/* Indication d'aide */}
              <small id="date-hint" className="hint-text">
                Sélectionnez une date à partir d'aujourd'hui
              </small>
              
              {/* Message d'erreur */}
              {errors.date && touched.date && (
                <p 
                  id="date-error" 
                  className="error-message" 
                  role="alert" 
                  aria-live="polite"
                >
                  <span aria-hidden="true">⚠️</span>
                  <span className="visually-hidden">Erreur:</span> {errors.date}
                </p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="res-time" id="time-label">
                Heure de réservation <span aria-hidden="true">*</span>
                <span className="visually-hidden"> (requis)</span>
              </label>
              
              <select
                ref={timeSelectRef}
                id="res-time"
                name="res-time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setTouched({...touched, time: true});
                }}
                onBlur={() => handleBlur('time')}
                onKeyDown={(e) => handleKeyDown(e, guestsInputRef)}
                required
                aria-required="true"
                aria-labelledby="time-label"
                aria-describedby={errors.time && touched.time ? "time-error" : "time-hint"}
                aria-invalid={errors.time && touched.time ? "true" : "false"}
                data-testid="time-select"
                className={errors.time && touched.time ? 'input-error' : ''}
              >
                <option value="">Sélectionnez une heure</option>
                {availableTimes.map((timeSlot, index) => (
                  <option key={index} value={timeSlot}>
                    {timeSlot}
                  </option>
                ))}
              </select>
              
              <small id="time-hint" className="hint-text">
                Heures disponibles pour la date sélectionnée
              </small>
              
              {errors.time && touched.time && (
                <p 
                  id="time-error" 
                  className="error-message" 
                  role="alert" 
                  aria-live="polite"
                >
                  <span aria-hidden="true">⚠️</span>
                  <span className="visually-hidden">Erreur:</span> {errors.time}
                </p>
              )}
            </div>
          </fieldset>
          
          {/* Section Informations supplémentaires */}
          <fieldset aria-labelledby="info-legend">
            <legend id="info-legend" className="visually-hidden">Informations supplémentaires</legend>
            
            <div className="form-group">
              <label htmlFor="guests" id="guests-label">
                Nombre d'invités <span aria-hidden="true">*</span>
                <span className="visually-hidden"> (requis)</span>
              </label>
              
              <input
                ref={guestsInputRef}
                type="number"
                id="guests"
                name="guests"
                value={guests}
                onChange={handleGuestsChange}
                onBlur={() => handleBlur('guests')}
                onKeyDown={(e) => handleKeyDown(e, occasionSelectRef)}
                min="1"
                max="10"
                required
                aria-required="true"
                aria-labelledby="guests-label"
                aria-describedby={errors.guests && touched.guests ? "guests-error" : "guests-hint"}
                aria-invalid={errors.guests && touched.guests ? "true" : "false"}
                data-testid="guests-input"
                className={errors.guests && touched.guests ? 'input-error' : ''}
              />
              
              <small id="guests-hint" className="hint-text">
                Minimum 1 personne, maximum 10 personnes
              </small>
              
              {errors.guests && touched.guests && (
                <p 
                  id="guests-error" 
                  className="error-message" 
                  role="alert" 
                  aria-live="polite"
                >
                  <span aria-hidden="true">⚠️</span>
                  <span className="visually-hidden">Erreur:</span> {errors.guests}
                </p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="occasion" id="occasion-label">
                Occasion <span aria-hidden="true">*</span>
                <span className="visually-hidden"> (requis)</span>
              </label>
              
              <select
                ref={occasionSelectRef}
                id="occasion"
                name="occasion"
                value={occasion}
                onChange={handleOccasionChange}
                onBlur={() => handleBlur('occasion')}
                onKeyDown={(e) => handleKeyDown(e, submitButtonRef)}
                required
                aria-required="true"
                aria-labelledby="occasion-label"
                aria-describedby={errors.occasion && touched.occasion ? "occasion-error" : "occasion-hint"}
                aria-invalid={errors.occasion && touched.occasion ? "true" : "false"}
                data-testid="occasion-select"
                className={errors.occasion && touched.occasion ? 'input-error' : ''}
              >
                <option value="">Sélectionnez une occasion</option>
                <option value="Birthday">Anniversaire</option>
                <option value="Anniversary">Anniversaire de mariage</option>
                <option value="Business">Réunion d'affaires</option>
                <option value="Other">Autre célébration</option>
              </select>
              
              <small id="occasion-hint" className="hint-text">
                Pour nous aider à mieux vous servir
              </small>
              
              {errors.occasion && touched.occasion && (
                <p 
                  id="occasion-error" 
                  className="error-message" 
                  role="alert" 
                  aria-live="polite"
                >
                  <span aria-hidden="true">⚠️</span>
                  <span className="visually-hidden">Erreur:</span> {errors.occasion}
                </p>
              )}
            </div>
          </fieldset>
          
          {/* Section Actions */}
          <div className="form-actions" role="group" aria-labelledby="actions-heading">
            <h3 id="actions-heading" className="visually-hidden">Actions du formulaire</h3>
            
            {/* ÉTAPE 2: Attribut ARIA label sur le bouton */}
            <button
              ref={submitButtonRef}
              type="submit"
              disabled={!isFormValid || isSubmitting}
              data-testid="submit-button"
              aria-label="On Click"
              aria-describedby={isFormValid ? "submit-hint" : "submit-error"}
              className="primary-button"
            >
              {isSubmitting ? (
                <>
                  <span aria-hidden="true">⏳</span>
                  <span className="visually-hidden">Envoi en cours</span> Envoi en cours...
                </>
              ) : (
                <>
                  <span aria-hidden="true">✅</span>
                  <span className="visually-hidden">Soumettre la réservation</span> Réserver maintenant
                </>
              )}
            </button>
            
            {/* Indications d'état */}
            {!isFormValid && Object.keys(touched).length > 0 && (
              <p 
                id="submit-error" 
                className="error-message" 
                role="alert" 
                aria-live="polite"
              >
                <span aria-hidden="true">⚠️</span>
                <span className="visually-hidden">Erreur:</span> Veuillez corriger les erreurs ci-dessus avant de soumettre.
              </p>
            )}
            
            {isFormValid && (
              <p id="submit-hint" className="hint-text">
                Tous les champs sont valides. Appuyez sur Entrée ou cliquez pour soumettre.
              </p>
            )}
          </div>
          
          {/* Région ARIA live pour les messages dynamiques */}
          <div 
            id="form-status" 
            aria-live="polite" 
            aria-atomic="true"
            className="visually-hidden"
          >
            {isSubmitting && "Envoi de la réservation en cours..."}
          </div>
        </form>
        
        {/* Instructions accessibles */}
        <aside aria-labelledby="accessibility-instructions">
          <h3 id="accessibility-instructions" className="visually-hidden">Instructions d'accessibilité</h3>
          <div className="accessibility-tips">
            <p>
              <strong>Conseils d'utilisation :</strong>
            </p>
            <ul>
              <li>Utilisez Tab pour naviguer entre les champs</li>
              <li>Appuyez sur Entrée pour passer au champ suivant</li>
              <li>Les champs obligatoires sont indiqués par un astérisque (*)</li>
              <li>Les erreurs sont annoncées automatiquement</li>
            </ul>
          </div>
        </aside>
      </article>
    </main>
  );
}

// Styles CSS pour l'accessibilité
const styles = 
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .booking-article {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .lead-text {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  fieldset {
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  legend {
    font-weight: bold;
    padding: 0 10px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  input:focus, select:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
  
  .input-error {
    border-color: #f44336 !important;
  }
  
  .hint-text {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .error-message {
    color: #d32f2f;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #ffebee;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .primary-button {
    width: 100%;
    padding: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.125rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .primary-button:hover:not(:disabled) {
    background-color: #45a049;
  }
  
  .primary-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.5);
  }
  
  .primary-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .form-actions {
    margin-top: 2rem;
  }
  
  .accessibility-tips {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .accessibility-tips ul {
    margin: 0.5rem 0 0 1.5rem;
    padding: 0;
  }
;

// Ajouter les styles au document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default BookingPage;
