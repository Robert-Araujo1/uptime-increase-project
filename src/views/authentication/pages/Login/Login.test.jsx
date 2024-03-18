import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Page', () => {
  it('should block a login try when the inputs is empty', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(document.getElementById('confirm-login-btn'));
    expect(document.querySelector('form').checkValidity()).toBe(false);
  });

  it('should pass when fields are filled in', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(
      'uptimeincreaseproject@domain.com'
    );
    const passwordInput = screen.getByPlaceholderText('************');

    await user.type(emailInput, 'thisisaemail@email.com');
    await user.type(passwordInput, 'th1s1s4p4ssw0rd');

    fireEvent.click(document.getElementById('confirm-login-btn'));
    expect(document.querySelector('form').checkValidity()).toBe(true);
  });
});
