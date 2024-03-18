import CredentialInput from '../../components/CredentialInput';
import ButtonBox from '../../components/ButtonBox';
import i18next from '../../../../i18n/i18n';
import { useNavigate } from 'react-router-dom';
import ButtonText from '../../components/ButtonText';

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => {
      navigate('/home/dashboard');
    }, 2000);
  };
  return (
    <form method='POST' onSubmit={handleSubmit}>
      <CredentialInput
        id={'email-field'}
        type={'email'}
        placeholder={'uptimeincreaseproject@domain.com'}
        lbl={'Email'}
      />
      <CredentialInput
        id={'password-field'}
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.login.password')}
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
