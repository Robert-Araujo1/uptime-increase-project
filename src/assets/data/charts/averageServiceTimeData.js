import { months } from './constants';

export default {
  labels: months,
  datasets: [
    {
      label: 'Tempo médio (h)',
      data: [32, 24, 18, 20, 21, 29, 16, 19, 23],
      borderColor: 'rgba(255, 255, 255, .8)',
      backgroundColor: 'rgba(255, 255, 255, .8)',
      pointRadius: 5,
    },
  ],
};
