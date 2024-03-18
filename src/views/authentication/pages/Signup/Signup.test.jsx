import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './SignUp';

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
});
