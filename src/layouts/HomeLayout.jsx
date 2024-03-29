import UIPHomeHeader from '../components/UIPHomeHeader';
import UIPHomeOffcanvas from '../components/UIPHomeOffcanvas';

function HomeLayout({ view, title }) {
  return (
    <>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <UIPHomeOffcanvas />
          {/* --------------------- START OF CONTENT ---------------------- */}
          <div className='col py-3 px-3 page-background'>
            <UIPHomeHeader headerTitle={title} />
            {view}
          </div>
          {/* --------------------- END OF CONTENT ---------------------- */}
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
