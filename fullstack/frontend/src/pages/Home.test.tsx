import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('Home component', () => {
  it('should render correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByText(/Qui êtes-vous ?/i)).toBeInTheDocument();
    expect(screen.getByText(/Je suis un agent/i)).toBeInTheDocument();
    expect(screen.getByText(/Je suis un candidat/i)).toBeInTheDocument();

    const connexionRapideButton = screen.getByText(/Connexion rapide/i);
    expect(connexionRapideButton).toBeInTheDocument();
  });

  it('should enable "Connexion rapide" button when a card is clicked', () => {
    render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(screen.getByText(/Je suis un agent/i));
    expect(screen.getByText(/Connexion rapide/i)).not.toBeDisabled();

    fireEvent.click(screen.getByText(/Je suis un candidat/i));
    expect(screen.getByText(/Connexion rapide/i)).not.toBeDisabled();
  });
});
