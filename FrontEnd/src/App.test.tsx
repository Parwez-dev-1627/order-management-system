


import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './components/pages/Dashboard';
import Orders from './components/pages/Orders';
import Products from './components/pages/Products';
import Customers from './components/pages/Customers';
import Reports from './components/pages/Reports';

describe('Dashboard Page', () => {
  test('renders Dashboard heading', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});

describe('Orders Page', () => {
  test('renders Order Management heading', () => {
    render(<Orders />);
    expect(screen.getByText(/Order Management/i)).toBeInTheDocument();
  });
});

describe('Products Page', () => {
  test('renders Product Management heading', () => {
    render(<Products />);
    expect(screen.getByText(/Product Management/i)).toBeInTheDocument();
  });
});

describe('Customers Page', () => {
  test('renders Customer Management heading', () => {
    render(<Customers />);
    expect(screen.getByText(/Customer Management/i)).toBeInTheDocument();
  });
});

describe('Reports Page', () => {
  test('renders Reports heading', () => {
    render(<Reports />);
    expect(screen.getByText(/Reports/i)).toBeInTheDocument();
  });
});
