import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders loading screen and then the main application', async () => {
  render(<App />);

  // Check for loading screen
  expect(screen.getByText(/Initializing Pravaah System/i)).toBeInTheDocument();

  // Wait for the main content to appear after the loading simulation
  await waitFor(() => {
    expect(screen.getByText(/Pravaah Hospital Management System/i)).toBeInTheDocument();
  }, { timeout: 2000 }); // Wait for timeout + buffer
});
