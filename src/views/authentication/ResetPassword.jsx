import ButtonBox from './components/ButtonBox';
import ButtonText from './components/ButtonText';
import CredentialInput from './components/CredentialInput';
import i18next from '../../i18n/i18n';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/resetpasswordmsg', { state: { email: email } });
  };
  return (
    <form method='POST' onSubmit={handleSubmit}>
      <CredentialInput
        id={'email-field'}
        type={'email'}
        placeholder={'uptimeincreaseproject@domain.com'}
        lbl={'Email'}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox
          idBtn='confirm-reset-btn'
          text={i18next.t('auth.resetPassword.resetPasswordBtn')}
        />
        <ButtonText
          text={i18next.t('auth.resetPassword.backBtn')}
          href={'/login'}
        />
      </div>
    </form>
  );
}

export default ResetPassword;
