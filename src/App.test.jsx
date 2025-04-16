// App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './Store/store'
// Helper to render App with router and redux
const renderApp = (initialRoute = '/') => {
  window.history.pushState({}, 'Test page', initialRoute);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe('App Routing Tests', () => {
  test('renders Login page when route is /login', () => {
  renderApp('/login');
  // Use getByRole for heading or button, depending on what you want to target
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('renders Sign Up page when route is /signUp', () => {
  renderApp('/signUp');
  expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
});


  test('renders Forgot Password page at /forgot-password', () => {
    renderApp('/forgot-password');
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

 
});
