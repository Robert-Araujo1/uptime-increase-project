import FlagsBtns from '../components/FlagsBtns';
import i18next from '../i18n/i18n';

function AuthLayout(props) {
  return (
    <div className='container-fluid d-flex align-items-center justify-content-center flex-column page-background'>
      <h4 className='mb-2 text-primary-emphasis'>Uptime Increase Project</h4>

      <div className='auth-card card'>
        <div className='card-body'>{props.children}</div>
      </div>
      <div className='footer mt-4'>
        <FlagsBtns />
      </div>
    </div>
  );
}

export default AuthLayout;
