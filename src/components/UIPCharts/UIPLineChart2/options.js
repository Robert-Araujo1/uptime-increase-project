import { months } from '../../../assets/data/charts/constants';
import i18next from '../../../i18n/i18n';
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
    tickAmount: 5,
    title: {
      text: i18next.t('home.dashboard.charts.averageDowntimeChart.labelY'),
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
    borderColor: 'rgba(255, 255, 255, .2)',
  },
  colors: ['#6610f2', '#fd7e14', '#1cfce2'],
};
