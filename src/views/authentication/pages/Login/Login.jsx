import CredentialInput from '../../components/CredentialInput';
import ButtonBox from '../../components/ButtonBox';
import i18next from '../../../../i18n/i18n';
import ButtonText from '../../components/ButtonText';
import checkFormValidity from '../../helpers/checkFormValidity';
import { signIn } from '../../../../services/authentication';
import { useState } from 'react';
import {
  showLoadingEffect,
  removeLoadingEffect,
} from '../../helpers/loadingEffect';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    showLoadingEffect('confirm-login-btn');

    try {
      const session = await signIn(email, password);
      if (session === 'NEW_PASSWORD_REQUIRED') {
        window.location.href = `/newPassword/${sessionStorage.getItem('UserId')}`;
        return;
      }

      if (session && typeof session.AccessToken !== 'undefined') {
        localStorage.setItem('accessToken', session.AccessToken);
        if (localStorage.getItem('accessToken')) {
          window.location.href = '/home/machines';
        } else {
          console.error('Session token was not set properly');
        }
      } else {
        console.error('SignIn session or AccessToken is undefined');
      }
    } catch (error) {
      alert(`Sign in failed: ${error}`);
    }

    removeLoadingEffect('confirm-login-btn', i18next.t('auth.login.loginBtn'));
  };

  return (
    <form
      method='POST'
      onSubmit={(event) =>
        checkFormValidity(event) ? handleSignIn(event) : null
      }>
      <CredentialInput
        id={'email-field'}
        type={'email'}
        placeholder={'uptimeincreaseproject@domain.com'}
        onChange={(e) => setEmail(e.target.value)}
        lbl={'Email'}
      />
      <CredentialInput
        id={'password-field'}
        type={'password'}
        placeholder={'************'}
        onChange={(e) => setPassword(e.target.value)}
        lbl={i18next.t('auth.password')}
      />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox
          idBtn='confirm-login-btn'
          text={i18next.t('auth.login.loginBtn')}
        />
        <ButtonText
          text={i18next.t('auth.login.forgotPasswordBtn')}
          href='/resetpassword'
        />
        <ButtonText text={i18next.t('auth.login.signUpBtn')} href='/signup' />
      </div>
    </form>
  );
}

export default Login;
