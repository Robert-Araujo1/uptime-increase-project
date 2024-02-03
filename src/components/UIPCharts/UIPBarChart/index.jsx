import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import configs from '../configs';
import UIPChart from '../UIPChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function UIPBarChart({ data, background, title, text }) {
  return (
    <UIPChart
      chart={<Bar data={data} options={configs} redraw />}
      background={background}
      title={title}
      text={text}
    />
  );
}
