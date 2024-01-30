import CredentialInput from './components/CredentialInput';
import ButtonBox from './components/ButtonBox';
import i18next from '../../i18n/i18n';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home/dashboard');
  };
  return (
    <form method='POST' onSubmit={handleSubmit}>
      <CredentialInput
        type={'email'}
        placeholder={'uptimeincreaseproject@domain.com'}
        lbl={'Email'}
      />
      <CredentialInput
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.login.password')}
      />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox text={i18next.t('auth.login.loginBtn')} />
        <a href='/resetpassword' className='link-underline-light pt-4'>
          {i18next.t('auth.login.forgotPasswordBtn')}
        </a>
        <a href='/signup' className='link-underline-light pt-2'>
          {i18next.t('auth.login.signUpBtn')}
        </a>
      </div>
    </form>
  );
}

export default Login;
