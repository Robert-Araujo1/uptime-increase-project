import ButtonBox from './components/ButtonBox';
import ButtonText from './components/ButtonText';
import CredentialInput from './components/CredentialInput';
import i18next from '../../i18n/i18n';

function ResetPassword() {
  return (
    <>
      <CredentialInput
        type={'email'}
        placeholder={'uptimeincreaseproject@domain.com'}
        lbl={'Email'}
      />
      <div className='form-group mt-4 d-flex justify-content-center flex-column align-items-center'>
        <ButtonBox text={i18next.t('auth.resetPassword.resetPasswordBtn')} />
        <ButtonText
          text={i18next.t('auth.resetPassword.backBtn')}
          href={'/login'}
        />
      </div>
    </>
  );
}

export default ResetPassword;
