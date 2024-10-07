import UIPWorkshopTable from '../../../components/UIPWorkshopTable';
import styles from './styles';
import Skeleton from '@mui/material/Skeleton';
import WMInsightCards from './components/WMInsightCards';
import { getWMInsights } from '../../../services/uipApi';
import { useState, useEffect } from 'react';

export default function () {
  const [insights, setInsights] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWMInsights()
      .then(({ body }) => {
        setInsights(JSON.parse(body));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {loading ? <SkeletonCards /> : <WMInsightCards insights={insights} />}
      <UIPWorkshopTable />
    </>
  );
}

const SkeletonCards = () => (
  <div className='row mt-4'>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className='col-md mb-2'>
        <Skeleton sx={styles.skeleton} variant='rounded' height={90} />
      </div>
    ))}
  </div>
);
