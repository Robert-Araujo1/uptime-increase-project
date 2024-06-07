import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import getMachines from '../../../services/getMachines';
import { useDispatch } from 'react-redux';
import { updateMachines } from '../../../features/machines/machinesSlice';
import { useState } from 'react';
import { useEffect } from 'react';

function Machines() {
  const [machinesList, setMachinesList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchMachines() {
      const machines = await getMachines();
      setMachinesList(machines);
      dispatch(updateMachines(machines));
    }
    fetchMachines();
  }, []);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='machines-content'>
          <div className='row mt-4'>
            <div className='col-xxl-8 mb-4'>
              <UIPDowntimeTable machines={machinesList} />
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
