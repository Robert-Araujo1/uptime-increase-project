import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';

function Machines() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='machines-content'>
          <div className='row mt-4'>
            <div className='col-xxl-8 mb-4'>
              <UIPDowntimeTable />
            </div>
            <div className='col-xxl-4'>
              <UIPMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machines;
