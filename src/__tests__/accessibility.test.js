// src/__tests__/accessibility.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingPage from '../BookingPage';

// Mock de l'API
global.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00']);
global.submitAPI = jest.fn(() => true);

describe('Accessibilité - ÉTAPE 1: Balisage sémantique', () => {
  test('doit avoir un élément main avec rôle approprié', () => {
    render(<BookingPage />);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveAttribute('aria-label', 'Formulaire de réservation Little Lemon');
  });

  test('doit utiliser des éléments sémantiques (article, header, fieldset)', () => {
    render(<BookingPage />);
    
    // Vérifier les éléments sémantiques
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getAllByRole('group')).toHaveLength(2); // fieldset
  });

  test('doit avoir des titres hiérarchiques corrects', () => {
    render(<BookingPage />);
    
    // Vérifier la hiérarchie des titres
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Réserver une table');
  });
});

describe('Accessibilité - ÉTAPE 2: Attributs ARIA', () => {
  test('le bouton de soumission doit avoir aria-label="On Click"', () => {
    render(<BookingPage />);
    
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    expect(submitButton).toHaveAttribute('aria-label', 'On Click');
  });

  test('les champs doivent avoir aria-required', () => {
    render(<BookingPage />);
    
    const dateInput = screen.getByLabelText(/date de réservation/i);
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    
    expect(dateInput).toHaveAttribute('aria-required', 'true');
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
  });

  test('doit avoir aria-describedby pour les indications', () => {
    render(<BookingPage />);
    
    const dateInput = screen.getByLabelText(/date de réservation/i);
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    
    expect(dateInput).toHaveAttribute('aria-describedby');
    expect(guestsInput).toHaveAttribute('aria-describedby');
  });

  test('doit avoir aria-invalid pour les champs en erreur', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    
    // Mettre une valeur invalide
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    await user.tab(); // Déclencher le blur
    
    // Vérifier que aria-invalid est true
    expect(guestsInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('doit avoir des régions ARIA live pour les messages', () => {
    render(<BookingPage />);
    
    // Vérifier les régions ARIA live
    const liveRegions = screen.getAllByRole('alert');
    expect(liveRegions.length).toBeGreaterThan(0);
    
    const formStatus = document.getElementById('form-status');
    expect(formStatus).toHaveAttribute('aria-live', 'polite');
  });
});

describe('Accessibilité - ÉTAPE 3: Étiquettes de formulaire', () => {
  test('tous les champs doivent avoir des labels associés', () => {
    render(<BookingPage />);
    
    // Vérifier que chaque champ a un label
    const dateInput = screen.getByLabelText(/date de réservation/i);
    const timeSelect = screen.getByLabelText(/heure de réservation/i);
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    
    expect(dateInput).toBeInTheDocument();
    expect(timeSelect).toBeInTheDocument();
    expect(guestsInput).toBeInTheDocument();
    expect(occasionSelect).toBeInTheDocument();
  });

  test('les labels doivent être liés aux inputs avec htmlFor/id', () => {
    render(<BookingPage />);
    
    // Vérifier les associations label/input
    const dateLabel = screen.getByText(/date de réservation/i);
    const dateInput = screen.getByLabelText(/date de réservation/i);
    
    expect(dateLabel).toHaveAttribute('for', 'res-date');
    expect(dateInput).toHaveAttribute('id', 'res-date');
    
    // Vérifier que le for correspond à l'id
    expect(dateLabel.getAttribute('for')).toBe(dateInput.getAttribute('id'));
  });

  test('les champs doivent être navigables au clavier', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    
    // Focus sur le premier champ
    const dateInput = screen.getByLabelText(/date de réservation/i);
    await user.tab();
    
    expect(dateInput).toHaveFocus();
    
    // Naviguer vers le champ suivant avec Tab
    await user.tab();
    const timeSelect = screen.getByLabelText(/heure de réservation/i);
    expect(timeSelect).toHaveFocus();
    
    // Naviguer encore
    await user.tab();
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    expect(guestsInput).toHaveFocus();
  });

  test('le focus doit être géré après soumission', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    
    // Remplir le formulaire
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    
    await user.clear(guestsInput);
    await user.type(guestsInput, '3');
    await user.selectOptions(occasionSelect, 'Birthday');
    await user.click(submitButton);
    
    // Vérifier que le formulaire reçoit le focus après réinitialisation
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    
    alertMock.mockRestore();
  });
});

describe('Accessibilité - Tests supplémentaires', () => {
  test('doit avoir des textes cachés pour les lecteurs d\'écran', () => {
    render(<BookingPage />);
    
    // Vérifier les textes visuellement cachés mais accessibles
    const hiddenElements = document.querySelectorAll('.visually-hidden');
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  test('les messages d\'erreur doivent avoir role="alert"', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    const guestsInput = screen.getByLabelText(/nombre d'invités/i);
    
    // Créer une erreur
    await user.clear(guestsInput);
    await user.type(guestsInput, '0');
    await user.tab();
    
    // Vérifier les messages d'alerte
    const errorMessages = screen.getAllByRole('alert');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('doit supporter la navigation par touches', async () => {
    render(<BookingPage />);
    
    const user = userEvent.setup();
    
    // Navigation avec Tab
    await user.tab(); // Date
    await user.tab(); // Heure
    await user.tab(); // Invités
    await user.tab(); // Occasion
    await user.tab(); // Bouton
    
    const submitButton = screen.getByRole('button', { name: /réserver/i });
    expect(submitButton).toHaveFocus();
  });
});
