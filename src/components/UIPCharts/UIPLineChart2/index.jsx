import ReactApexChart from 'react-apexcharts';
import { options } from './options';
import { chartSeries as series } from '../../../assets/data/charts/downtimeMachinesPerRegion';

export default function () {
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
