import UIPHomeHeader from '../components/UIPHomeHeader';
import UIPHomeOffcanvas from '../components/UIPHomeOffcanvas';

function HomeLayout({ view }) {
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
