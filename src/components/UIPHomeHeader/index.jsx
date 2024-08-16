export default () => {
  return (
    <div className='d-flex flex-row page-header align-items-top justify-content-between'>
      <div className='ps-3'>
        <h4 className='fw-light' style={{ r: '#2D4A5D' }}>
          Uptime Increase Project
        </h4>
      </div>
      <div className='text-end w-25'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasContent'
          aria-controls='offcanvasContent'
          aria-expanded='false'
          aria-label='Toggle sidebar'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='currentColor'
            className='bi bi-list'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
