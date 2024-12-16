import { useEffect, useState } from 'react';
import UIPPopsMap from '../../../components/UIPPopsMap';
import UIPPopsTable from '../../../components/UIPPopsTable';
import { getPopsMachines } from '../../../services/uipApi';
import { useDispatch } from 'react-redux';
import { setPopsMachines } from '../../../features/pops/popsMachinesSlice';
export default function () {
  const [pops, setPops] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPops() {
      const data = await getPopsMachines();
      setPops(data);
      dispatch(setPopsMachines(data));
    }
    getPops();
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row mt-4'>
        <div className='col-xxl-8 mb-4'>
          <UIPPopsTable rows={pops} />
        </div>
        <div className='col-xxl-4'>
          <UIPPopsMap />
        </div>
      </div>
    </div>
  );
}
