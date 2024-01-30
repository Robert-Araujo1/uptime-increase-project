import brazilFlag from '../assets/images/brazil.png';
import usFlag from '../assets/images/united-states.png';
import FlagBtn from '../components/FlagBtn';

function AuthLayout(props) {
  return (
    <div className='container-fluid d-flex align-items-center justify-content-center flex-column page-background'>
      <h4 className='mb-3 text-primary-emphasis'>Uptime Increase Project</h4>
      <div className='auth-card card'>
        <div className='card-body'>{props.children}</div>
      </div>
      <div className='footer mt-4'>
        <FlagBtn lang={'pt'} srcFlag={brazilFlag} altFlag={'Brazil Flag'} />
        <FlagBtn lang={'us'} srcFlag={usFlag} altFlag={'United States Flag'} />
      </div>
    </div>
  );
}

export default AuthLayout;
