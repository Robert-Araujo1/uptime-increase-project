import ButtonText from './components/ButtonText';
import i18next from '../../i18n/i18n';
function ResetPasswordMsg() {
  return (
    <>
      <h5 className='card-title'>
        {i18next.t('auth.resetPassword.resetPasswordTitle')}
      </h5>
      <p className='card-text text-break'>
        {i18next.t('auth.resetPassword.resetPasswordText')}
      </p>
      <ButtonText text={i18next.t('auth.resetPassword.backBtn')} href={'/'} />
    </>
  );
}

export default ResetPasswordMsg;
