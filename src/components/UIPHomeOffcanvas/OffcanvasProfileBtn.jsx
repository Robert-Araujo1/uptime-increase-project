export default () => {
  return (
    <div className='dropdown pb-4 mt-auto'>
      <a
        href='#'
        className='d-flex align-items-center text-primary-emphasis text-decoration-none dropdown-toggle'
        id='dropdownUserExample'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        <img
          src='https://github.com/github.png'
          alt='user'
          width='30'
          height='30'
          className='rounded-circle'
        />
        <span className='d-sm-inline mx-1'>John Doe</span>
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
          <a className='dropdown-item' href='#'>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  );
};
