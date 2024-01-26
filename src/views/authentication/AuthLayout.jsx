import { useNavigate } from 'react-router-dom';
import i18next from '../../i18n/i18n';

function AuthLayout({ children, route }) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(route);
  };

  return (
    <div className='container-fluid d-flex align-items-center justify-content-center flex-column page-background'>
      <h4 className='mb-3 text-primary-emphasis'>Uptime Increase Project</h4>
      <div className='card'>
        <div className='card-body'>
          <form method='POST' onSubmit={handleSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
