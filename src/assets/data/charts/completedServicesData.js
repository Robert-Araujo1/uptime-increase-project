import { months } from './constants';

export default {
  labels: months,
  datasets: [
    {
      label: 'Concluídos',
      data: [23, 30, 12, 14, 21, 19, 16, 25, 31],
      borderColor: 'rgba(255, 255, 255, .8)',
      backgroundColor: 'rgba(255, 255, 255, .8)',
      pointRadius: 5,
    },
  ],
};
