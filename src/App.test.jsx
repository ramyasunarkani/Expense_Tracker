import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './Store/store';

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
  test('renders Login page when route is /login', async () => {
    renderApp('/login');
    await waitFor(() => screen.findByRole('heading', { name: /login/i }));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('renders Sign Up page when route is /signUp', async () => {
    renderApp('/signUp');
    await waitFor(() => screen.findByRole('heading', { name: /sign up/i }));
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  test('renders Forgot Password page at /forgot-password', async () => {
    renderApp('/forgot-password');
    await waitFor(() => screen.findByText(/forgot password/i));
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });
  test('redirects to login if user is not logged in', async () => {
  renderApp('/');
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('redirects to home if user is logged in', async () => {
  // Mock a logged-in user
  store.dispatch({ type: 'login' });
  renderApp('/');
  await waitFor(() => screen.getByText(/home/i));
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

});
