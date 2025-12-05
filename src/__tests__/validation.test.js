// src/__tests__/validation.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingPage from '../BookingPage';

// Mock de l'API
global.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00']);
global.submitAPI = jest.fn(() => true);

describe('Validation HTML5 - ÉTAPE 1', () => {
  beforeEach(() => {
    fetchAPI.mockClear();
    submitAPI.mockClear();
  });

  test('le champ date doit avoir les attributs HTML5 requis', () => {
    render(<BookingPage />);
    
    const dateInput = screen.getByLabelText(/date \*/i);
    
    // Vérifier les attributs HTML5
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('min');
    
    // Vérifier que min est aujourd'hui ou après
    const today = new Date().toISOString().split('T')[0];
    expect(dateInput.getAttribute('min')).toBe(today);
  });

  test('le champ invités doit avoir les attributs HTML5 min et max', () => {
    render(<BookingPage />);
    
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    
    // Vérifier les attributs HTML5
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('le champ occasion doit avoir l\'attribut required', () => {
    render(<BookingPage />);
    
    const occasionSelect = screen.getByLabelText(/occasion \*/i);
    expect(occasionSelect).toHaveAttribute('required');
  });

  test('le formulaire doit avoir l\'attribut novalidate', () => {
    render(<BookingPage />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('novalidate');
  });

  test('le bouton doit être désactivé initialement si le formulaire est invalide', () => {
    // Mock fetchAPI pour retourner tableau vide
    fetchAPI.mockReturnValue([]);
    
    render(<BookingPage />);
    
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    expect(submitButton).toBeDisabled();
  });
});

describe('Validation JavaScript - ÉTAPE 2', () => {
  beforeEach(() => {
    fetchAPI.mockClear();
    submitAPI.mockClear();
  });

  // Test des états valides
  test('le formulaire doit être valide avec toutes les données correctes', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    
    // Remplir le formulaire correctement
    const dateInput = screen.getByLabelText(/date \*/i);
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const occasionSelect = screen.getByLabelText(/occasion \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    // Changer la valeur des invités (la date et l'heure sont déjà remplies)
    await user.clear(guestsInput);
    await user.type(guestsInput, '4');
    
    // Sélectionner une occasion
    await user.selectOptions(occasionSelect, 'Anniversary');
    
    // Attendre que le bouton soit activé
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  // Test des états invalides - Nombre d'invités
  test('le formulaire doit être invalide avec 0 invités', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    
    // Vérifier qu'un message d'erreur s'affiche
    const errorMessage = screen.getByText(/nombre invités invalide/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('le formulaire doit être invalide avec 11 invités', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '11');
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  // Test des états invalides - Date vide
  test('le formulaire doit être invalide avec une date vide', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const dateInput = screen.getByLabelText(/date \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    // Vider le champ date
    await user.clear(dateInput);
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    
    // Vérifier qu'un message d'erreur s'affiche
    const errorMessage = screen.getByText(/la date est requise/i);
    expect(errorMessage).toBeInTheDocument();
  });

  // Test des états invalides - Heure vide
  test('le formulaire doit être invalide sans heure sélectionnée', async () => {
    // Mock pour retourner tableau vide
    fetchAPI.mockReturnValue([]);
    
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const timeSelect = screen.getByLabelText(/heure \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    // Sélectionner une option vide
    await user.selectOptions(timeSelect, '');
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  // Test de soumission réussie
  test('la soumission doit réussir avec des données valides', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    
    // Remplir le formulaire
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const occasionSelect = screen.getByLabelText(/occasion \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '3');
    await user.selectOptions(occasionSelect, 'Birthday');
    
    // Attendre que le bouton soit activé
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
    
    // Soumettre le formulaire
    await user.click(submitButton);
    
    // Vérifier que submitAPI a été appelé
    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalledTimes(1);
      expect(submitAPI).toHaveBeenCalledWith({
        date: expect.any(String),
        time: expect.any(String),
        guests: 3,
        occasion: 'Birthday'
      });
    });
    
    // Vérifier que l'alerte a été appelée
    expect(alertMock).toHaveBeenCalledWith('✅ Réservation confirmée !');
    
    alertMock.mockRestore();
  });

  // Test de réinitialisation après soumission
  test('le formulaire doit se réinitialiser après soumission réussie', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    jest.spyOn(window, 'alert').mockImplementation();
    
    // Remplir le formulaire
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const occasionSelect = screen.getByLabelText(/occasion \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '5');
    await user.selectOptions(occasionSelect, 'Anniversary');
    
    // Soumettre
    await user.click(submitButton);
    
    // Vérifier que les champs sont réinitialisés
    await waitFor(() => {
      expect(guestsInput.value).toBe('1');
      expect(occasionSelect.value).toBe('Birthday');
    });
  });
});

describe('Tests de bord pour la validation', () => {
  test('champ invités avec valeur minimale (1)', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '1');
    
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  test('champ invités avec valeur maximale (10)', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '10');
    
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  test('validation en temps réel lors de la saisie', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités \*/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    // Commencer avec valeur invalide
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
    
    // Corriger la valeur
    await user.clear(guestsInput);
    await user.type(guestsInput, '2');
    
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });
});
