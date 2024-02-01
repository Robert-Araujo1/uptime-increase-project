export default () => {
  return (
    <div
      class='offcanvas offcanvas-end'
      tabindex='-1'
      id='offcanvasContent'
      aria-labelledby='homeOffcanvas'>
      <div class='offcanvas-header'>
        <h5 class='offcanvas-title' id='homeOffcanvas'>
          Menu
        </h5>
        <button
          type='button'
          class='btn-close'
          data-bs-dismiss='offcanvas'
          aria-label='Close'></button>
      </div>
      <div class='offcanvas-body d-flex flex-column align-items-start'>
        <div className='menu-list d-flex align-items-start flex-column mb-3'>
          <ul
            className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
            id='menu'>
            <li className='nav-item'>
              <a href='/home/dashboard' className='nav-link align-middle px-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className='bi bi-graph-up-arrow'
                  viewBox='0 0 16 16'>
                  <path
                    fill-rule='evenodd'
                    d='M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5'
                  />
                </svg>{' '}
                <span className='ms-1 d-sm-inline'>Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
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
            <span className='d-sm-inline mx-1'>user</span>
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
      </div>
    </div>
  );
};
