import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@playwright/test';
import '@testing-library/jest-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
