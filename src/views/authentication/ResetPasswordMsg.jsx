import ButtonText from './components/ButtonText';
import i18next from '../../i18n/i18n';
import { useLocation } from 'react-router-dom';
function ResetPasswordMsg() {
  const location = useLocation();
  return (
    <>
      <h5 className='card-title'>
        {i18next.t('auth.resetPassword.resetPasswordTitle')}
      </h5>
      <p className='card-text text-break'>
        {i18next.t('auth.resetPassword.resetPasswordText', {
          email: location.state.email,
        })}
      </p>
      <ButtonText text={i18next.t('auth.resetPassword.backBtn')} href={'/'} />
    </>
  );
}

export default ResetPasswordMsg;
