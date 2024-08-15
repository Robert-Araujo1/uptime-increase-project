import ReactApexChart from 'react-apexcharts';
import { options } from './options';

export default function ({ series }) {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type='area'
      width='100%'
      height='100%'
    />
  );
}
