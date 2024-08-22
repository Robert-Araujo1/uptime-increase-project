import { ToggleTheme } from '../../utils/themes';

export default () => {
  return (
    <div className='dropdown pb-4 mt-auto'>
      <a
        style={{ color: 'var(--light-text)' }}
        href='#'
        className='d-flex align-items-center text-decoration-none dropdown-toggle'
        id='dropdownUserExample'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        <span
          className='d-sm-inline mx-1'
          style={{ color: 'var(--light-text)' }}>
          {localStorage.getItem('email') || null}
        </span>
      </a>
      <ul className='dropdown-menu dropdown-menu-dark text-small shadow'>
        <li>
          <a className='dropdown-item' href='#'>
            Settings
          </a>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
        <li>
          <a
            className='dropdown-item'
            href='/'
            onClick={() => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('idToken');
              localStorage.removeItem('machines');
            }}>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};
