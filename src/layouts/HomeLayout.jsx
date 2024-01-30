import { FaClipboardCheck } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { BsClipboard2XFill } from 'react-icons/bs';
import InsightCard from '../components/InsightCard';
import DowntimeTable from '../components/DowntimeTable';

function HomeLayout() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          {/* --------------------- START OF SIDEBAR ---------------------- */}
          <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-body-tertiary navbar-vertical'>
            <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              <a
                href='/'
                className='d-flex align-items-center pt-2 pb-3 mb-md-0 me-md-auto text-primary-emphasis text-decoration-none'>
                <span className='fs-5 d-none d-sm-inline'>Menu</span>
              </a>
              <ul
                className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'
                id='menu'>
                <li className='nav-item'>
                  <a href='#' className='nav-link align-middle px-0'>
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
                    <span className='ms-1 d-none d-sm-inline'>Dashboard</span>
                  </a>
                </li>
              </ul>
              <hr />
              <div className='dropdown pb-4'>
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
                  <span className='d-none d-sm-inline mx-1'>user</span>
                </a>
                <ul className='dropdown-menu dropdown-menu-dark text-small shadow'>
                  <li>
                    <a className='dropdown-item' href='#'>
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Profile
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
          {/* --------------------- END OF SIDEBAR ---------------------- */}

          {/* --------------------- START OF CONTENT ---------------------- */}
          <div className='col py-3 px-3 page-background'>
            <div className='row page-title'>
              <h4 className='fw-light'>Dashboard</h4>
            </div>
            <div className='main-content'>
              <div className='insights'>
                <div className='row'>
                  <InsightCard
                    cardTitle={'Atendidos'}
                    insightIcon={
                      <FaClipboardCheck color='rgb(255, 255, 255)' size={20} />
                    }
                    backgroundIcon={'#198754'}
                  />
                  <InsightCard
                    backgroundIcon={'#0d6efd'}
                    cardTitle={'Em atendimento'}
                    insightIcon={
                      <GrInProgress color='rgb(255, 255, 255)' size={20} />
                    }
                  />
                  <InsightCard
                    backgroundIcon={'#dc3545'}
                    cardTitle={'Não atendidos'}
                    insightIcon={
                      <BsClipboard2XFill color='rgb(255, 255, 255)' size={20} />
                    }
                  />
                </div>
              </div>
              <div className='table-downtime-machines'>
                <div className='row'>
                  <DowntimeTable />
                </div>
              </div>
            </div>
          </div>
          {/* --------------------- END OF CONTENT ---------------------- */}
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
