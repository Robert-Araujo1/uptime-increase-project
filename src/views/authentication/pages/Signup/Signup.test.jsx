import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';
import '@testing-library/jest-dom';

describe('Signup Page', () => {
  it('should block when try to register with empty inputs', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    fireEvent.click(document.getElementById('confirm-sign-up-btn'));
    expect(document.querySelector('form').checkValidity()).toBe(false);
  });

  it('should not pass if the passwords inputs are not the same', async () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(
      'uptimeincreaseproject@domain.com'
    );
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirm-password');

    await user.type(emailInput, 'this_is_a_email@email.com');
    await user.type(password, 'SAMEPASSWORD?');
    await user.type(confirmPassword, 'SAMEPASSW0RD?');

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
