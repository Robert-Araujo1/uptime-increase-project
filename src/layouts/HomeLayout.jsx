import { useEffect } from 'react';
import UIPHomeHeader from '../components/UIPHomeHeader';
import UIPHomeOffcanvas from '../components/UIPHomeOffcanvas';
import { keepTheme } from '../utils/themes';

function HomeLayout({ view }) {
  useEffect(() => {
    keepTheme();
  });
  return (
    <>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <UIPHomeOffcanvas />
          {/* --------------------- START OF CONTENT ---------------------- */}
          <div className='col py-3 px-3 page-background'>
            <UIPHomeHeader />
            {view}
          </div>
          {/* --------------------- END OF CONTENT ---------------------- */}
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
