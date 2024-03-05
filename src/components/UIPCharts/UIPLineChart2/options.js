import { months } from '../../../assets/data/charts/constants';

export const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: { enabled: false },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: months,
    labels: {
      style: {
        colors: '#fff',
        fontSize: '12px',
        fontFamily: 'Roboto, sans-serif',
      },
    },
  },
  yaxis: {
    title: {
      text: 'Dias',
      style: {
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        color: '#fff',
      },
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '12px',
      },
    },
  },
  legend: {
    show: true,
    labels: { colors: '#fff' },
  },
  grid: {
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
  },

  colors: ['#6610f2', '#fd7e14', '#1cfce2'],
};
