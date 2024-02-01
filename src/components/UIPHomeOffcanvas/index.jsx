import OffcanvasMenuList from './OffcanvasMenuList';
import OffcanvasHeader from './OffcanvasHeader';
import OffcanvasProfileBtn from './OffcanvasProfileBtn';

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
      </div>
    </div>
  );
};
