import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom'; // Extends expect
import App from './App';

test('renders Narthos title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /Narthos/i, level: 1 });
  expect(titleElement).toBeInTheDocument();
});