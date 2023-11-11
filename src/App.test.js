import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quilty Meausures', () => {
  render(<App />);
  const linkElement = screen.getByText(/quilty measures/i);
  expect(linkElement).toBeInTheDocument();
});
