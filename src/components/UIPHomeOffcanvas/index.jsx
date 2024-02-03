import OffcanvasMenuList from './OffcanvasMenuList';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasProfileBtn from './OffcanvasProfileBtn';
import FlagsBtns from '../FlagsBtns';

export default () => {
  return (
    <div
      class='offcanvas offcanvas-end'
      tabindex='-1'
      id='offcanvasContent'
      aria-labelledby='homeOffcanvas'>
      <OffcanvasHeader />
      <div class='offcanvas-body d-flex flex-column align-items-start'>
        <OffcanvasMenuList />
        <OffcanvasProfileBtn />
        <div className='d-flex w-100 justify-content-center'>
          <FlagsBtns />
        </div>
      </div>
    </div>
  );
};
