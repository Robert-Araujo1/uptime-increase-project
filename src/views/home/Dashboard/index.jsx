import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPLineChart2 from '../../../components/UIPCharts/UIPLineChart2';
import UIPChart from '../../../components/UIPCharts/UIPChart';
import UIPUserUpdates from '../../../components/UIPUserUpdates';
import i18next from '../../../i18n/i18n';
import UIPLineChart from '../../../components/UIPCharts/UIPLineChart';
import UIPBarChart from '../../../components/UIPCharts/UIPBarChart';
import { useEffect, useState } from 'react';
import { getInsightData } from '../../../services/uipApi';
import { CircularProgress } from '@mui/material';

function Dashboard() {
  const [data, setData] = useState({});
  const cardsInfo = [
    {
      cardTitle: 'Máquinas paradas - R1',
      iconStyle: 'R1',
      cardValue: data?.machinesPerRegionalTotal?.R1 || null,
    },
    {
      cardTitle: 'Máquinas paradas - R2',
      iconStyle: 'R2',
      cardValue: data?.machinesPerRegionalTotal?.R2 || null,
    },
    {
      cardTitle: 'Máquinas paradas - R3',
      iconStyle: 'R3',
      cardValue: data?.machinesPerRegionalTotal?.R3 || null,
    },
    {
      cardTitle: i18next.t('home.dashboard.amountEquipCardTitle'),
      iconStyle: 'total',
      cardValue: data?.machinesNumber || null,
    },
  ];
  const chartsInfo = [
    <UIPLineChart
      data={chartData(
        data?.engineHoursAveragePerState
          ? Object.keys(data.engineHoursAveragePerState)
          : [],
        'Horímetro Médio',
        data?.engineHoursAveragePerState
          ? Object.values(data.engineHoursAveragePerState)
          : []
      )}
      background={
        'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'
      }
      title={'Horímetro Médio de Máquina parada por estado'}
      text={'Tempo em horas'}
    />,
    <UIPBarChart
      data={chartData(
        data?.machinesPerStateNumber
          ? Object.keys(data.machinesPerStateNumber)
          : [],
        'Equipamentos',
        data?.machinesPerStateNumber
          ? Object.values(data.machinesPerStateNumber)
          : []
      )}
      background={
        'linear-gradient(195deg, rgba(250,180,45,1) 0%, rgba(235,159,22,1) 100%)'
      }
      title={'Total de Máquinas Paradas por Estado'}
      text={'Quantidade'}
    />,
  ];

  useEffect(() => {
    async function fetchData() {
      const data = await getInsightData();
      const body = JSON.parse(data.body);
      if (body.hasOwnProperty('machinesNumber')) {
        setData(body);
      }
    }
    fetchData();
  }, []);
  return !data.hasOwnProperty('machinesPerStateNumber') ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
      }}>
      <CircularProgress />
    </div>
  ) : (
    <div className='container-fluid'>
      <div className='row'>
        <div className='insights py-4'>
          <div className='row'>
            {cardsInfo.map(({ cardTitle, iconStyle, cardValue }) => (
              <div key={cardTitle} className='col'>
                <UIPInsightCard
                  cardTitle={cardTitle}
                  iconStyle={iconStyle}
                  cardValue={cardValue}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='insights-charts'>
          <div className='row mb-4'>
            {chartsInfo.map((chart, index) => (
              <div key={index} className='col-lg-6 mb-3'>
                {chart}
              </div>
            ))}
          </div>
          <div className='col mb-4'>
            <UIPLineChart
              data={chartData(
                data?.categoryNumber ? Object.keys(data.categoryNumber) : [],
                'Equipamentos',
                data?.categoryNumber ? Object.values(data.categoryNumber) : []
              )}
              background={
                'linear-gradient(195deg, rgba(24,161,66,1) 0%, rgba(8,115,7,1) 100%)'
              }
              title={'Máquinas paradas por categoria'}
              text={'Unidade'}
            />
          </div>
          <div className='row mb-4'>
            <div className='col-xl-8 mb-3'>
              {
                <UIPChart
                  chart={<UIPLineChart2 series={lineChartSeries(data)} />}
                  background={
                    'linear-gradient(195deg, rgba(32,148,142,1) 0%, rgba(15,92,85,1) 100%)'
                  }
                  title={'Máquinas Paradas por Regional'}
                  text={'Quantidade'}
                />
              }
            </div>
            <div className='col-xl-4 mb-3'>
              <UIPUserUpdates />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const chartData = (xAxis, label, yAxis) => {
  return {
    labels: xAxis,
    datasets: [
      {
        label: label,
        data: yAxis,
        borderColor: 'rgba(255, 255, 255, .8)',
        backgroundColor: 'rgba(255, 255, 255, .8)',
        pointRadius: 5,
      },
    ],
  };
};

const lineChartSeries = (data) => {
  const series = (dataPerRegion) => [
    dataPerRegion?.Carregadeiras || 0,
    dataPerRegion?.Retroescavadeiras || 0,
    dataPerRegion?.Tratores || 0,
    dataPerRegion?.Escavadeiras || 0,
    dataPerRegion?.Motoniveladoras || 0,
  ];
  return [
    {
      name: i18next.t('home.dashboard.charts.averageDowntimeChart.legend.one'),
      data: series(data.categoriesPerRegion?.R1),
    },
    {
      name: i18next.t('home.dashboard.charts.averageDowntimeChart.legend.two'),
      data: series(data.categoriesPerRegion?.R2),
    },
    {
      name: i18next.t(
        'home.dashboard.charts.averageDowntimeChart.legend.three'
      ),
      data: series(data.categoriesPerRegion?.R3),
    },
  ];
};

export default Dashboard;
