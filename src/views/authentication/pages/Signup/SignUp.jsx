import CredentialInput from '../../components/CredentialInput';
import i18next from '../../../../i18n/i18n';
import ButtonBox from '../../components/ButtonBox';
import ButtonText from '../../components/ButtonText';
import { useNavigate } from 'react-router-dom';
import checkSignupForm from '../../helpers/checkSignupForm';
import { useState } from 'react';
import showLoadingEffect from '../../helpers/showLoadingEffect';

function SignUp() {
  const navigate = useNavigate();
  const [errorVisible, setErrorVisible] = useState(false);

  const fetchData = () => {
    showLoadingEffect('confirm-sign-up-btn');

    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  return (
    <form
      method='POST'
      onSubmit={(event) => (checkSignupForm(event) ? fetchData() : null)}>
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
        testId={'password'}
      />
      <CredentialInput
        id={'confirm-password-field'}
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.signUp.confirmPassword')}
        onCopyPaste={(e) => e.preventDefault()}
        testId={'confirm-password'}
        onChange={(event) =>
          event.target.value == document.getElementById('password-field').value
            ? setErrorVisible(false)
            : setErrorVisible(true)
        }
      />
      {errorVisible && (
        <div role='alert' className='card alert alert-warning p-2'>
          {i18next.t('auth.signUp.passwordNotMatch')}
        </div>
      )}
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox
          idBtn='confirm-sign-up-btn'
          text={i18next.t('auth.signUp.signUpBtn')}
        />
        <ButtonText
          text={i18next.t('auth.resetPassword.backBtn')}
          href={'/login'}
        />
      </div>
    </form>
  );
}

export default SignUp;
