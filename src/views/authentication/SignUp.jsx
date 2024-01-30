import CredentialInput from './components/CredentialInput';
import i18next from '../../i18n/i18n';
import ButtonBox from './components/ButtonBox';
import ButtonText from './components/ButtonText';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login');
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
      <CredentialInput
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.signUp.confirmPassword')}
      />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox text={i18next.t('auth.signUp.signUpBtn')} />
        <ButtonText
          text={i18next.t('auth.resetPassword.backBtn')}
          href={'/login'}
        />
      </div>
    </form>
  );
}

export default SignUp;
