import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import configs from '../configs';
import UIPChart from '../UIPChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UIPLineChart({ data, background, title, text }) {
  return (
    <UIPChart
      chart={<Line data={data} options={configs} redraw />}
      background={background}
      title={title}
      text={text}
    />
  );
}
