export default {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      color: '#f8f9fa',
      align: 'end',
      anchor: 'end',
      offset: 0,
    },
  },
  scales: {
    y: {
      grid: {
        drawBorder: false,
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        borderDash: [5, 5],
        color: 'rgba(255, 255, 255, .2)',
      },
      ticks: {
        display: true,
        color: '#f8f9fa',
        padding: 15,
        font: {
          size: 14,
          weight: 300,
          family: 'Roboto',
          style: 'normal',
          lineHeight: 2,
        },
      },
    },
    x: {
      grid: {
        drawBorder: true,
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        color: 'rgba(255, 255, 255, .2)',
        borderDash: [5, 5],
      },
      ticks: {
        display: true,
        color: '#f8f9fa',
        padding: 10,
        font: {
          size: 14,
          weight: 300,
          family: 'Roboto',
          style: 'normal',
          lineHeight: 2,
        },
      },
    },
  },
};
