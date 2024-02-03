import i18next from '../../i18n/i18n';

export default () => {
  return (
    <div className='dropdow'>
      <a
        className='btn btn-secondary dropdown-toggle btn-sm'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        {i18next.t('home.dashboard.selectStatusBtn')}
      </a>

      <ul className='dropdown-menu dropdown-menu-lg-end'>
        <li>
          <a className='dropdown-item' href='#'>
            {i18next.t('home.dashboard.completedType')}
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            {i18next.t('home.dashboard.inProgressType')}
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            {i18next.t('home.dashboard.notStartedType')}
          </a>
        </li>
      </ul>
    </div>
  );
};
