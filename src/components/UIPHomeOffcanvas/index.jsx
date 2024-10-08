import OffcanvasMenuList from './OffcanvasMenuList';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasProfileBtn from './OffcanvasProfileBtn';
import FlagsBtns from '../FlagsBtns';

export default () => {
  return (
    <div
      className='offcanvas offcanvas-end'
      style={{ background: 'var(--light-background)' }}
      tabIndex='-1'
      id='offcanvasContent'
      aria-labelledby='homeOffcanvas'>
      <OffcanvasHeader />
      <div className='offcanvas-body d-flex flex-column align-items-start ps-0'>
        <OffcanvasMenuList />
        <OffcanvasProfileBtn />
        <div className='d-flex w-100 justify-content-center'>
          <FlagsBtns />
        </div>
      </div>
    </div>
  );
};
