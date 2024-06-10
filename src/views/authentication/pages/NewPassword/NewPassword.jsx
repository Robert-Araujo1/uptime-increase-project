import ButtonBox from '../../components/ButtonBox';
import CredentialInput from '../../components/CredentialInput';
import i18next from '../../../../i18n/i18n';
import checkPasswordForm from '../../helpers/checkPasswordForm';
import { useState } from 'react';
import { showLoadingEffect } from '../../helpers/loadingEffect';
import { changePassword } from '../../../../services/authentication';
import PasswordRules from '../../components/PasswordRules';
import { VALID_PASSWORD_RGX } from '../../helpers/passwordValidation';

export default function () {
  const [username, setUsername] = useState(sessionStorage.getItem('Username'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    showLoadingEffect('confirm-reset-btn');
    try {
      const response = await changePassword(password);

      if (response.AuthenticationResult) {
        alert(i18next.t('auth.passwordSuccess'));
        window.location.href = '/';
      }
    } catch (error) {
      alert(`Password changing failed: ${error}`);
    }
  };
  return (
    <form
      method='POST'
      onSubmit={(event) =>
        checkPasswordForm(event) ? handleSubmit(event) : null
      }>
      <h6 style={{ textAlign: 'center', fontWeight: 'bold' }}>
        Crie uma nova senha
      </h6>
      <CredentialInput
        id={'email-field'}
        type={'email'}
        placeholder={username}
        lbl={'Email'}
        disabled={true}
        pattern={VALID_PASSWORD_RGX}
      />
      <CredentialInput
        id={'password-field'}
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.password')}
        onChange={(event) => setPassword(event.target.value)}
      />
      <CredentialInput
        id={'confirm-password-field'}
        type={'password'}
        placeholder={'************'}
        lbl={i18next.t('auth.confirmPassword')}
        onCopyPaste={(e) => e.preventDefault()}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <PasswordRules password={password} confirmPassword={confirmPassword} />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox
          idBtn='confirm-reset-btn'
          text={i18next.t('auth.confirmNewPassword')}
        />
      </div>
    </form>
  );
}
