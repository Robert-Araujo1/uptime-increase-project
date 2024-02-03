import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import UIPLineChart from '../../../components/UIPCharts/UIPLineChart';
import UIPBarChart from '../../../components/UIPCharts/UIPBarChart';
import i18next from '../../../i18n/i18n';

import averageServiceTimeData from '../../../assets/data/charts/averageServiceTimeData';
import completedServicesData from '../../../assets/data/charts/completedServicesData';
import equipPerRegion from '../../../assets/data/charts/equipPerRegion';

function Dashboard() {
  const cardsInfo = [
    {
      cardTitle: i18next.t('home.dashboard.completedType'),
      iconStyle: 'started',
      cardValue: 21,
    },
    {
      cardTitle: i18next.t('home.dashboard.inProgressType'),
      iconStyle: 'in-progress',
      cardValue: 3,
    },
    {
      cardTitle: i18next.t('home.dashboard.notStartedType'),
      iconStyle: 'not-started',
      cardValue: 1,
    },
    {
      cardTitle: i18next.t('home.dashboard.amountEquipCardTitle'),
      iconStyle: 'total',
      cardValue: 25,
    },
  ];

  return (
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
            <div className='col-md-4 mb-3'>
              <UIPLineChart
                data={averageServiceTimeData}
                background={
                  'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'
                }
                title={'Tempo médio mensal'}
                text={'Atendimento'}
              />
            </div>
            <div className='col-md-4 mb-3'>
              <UIPBarChart
                data={equipPerRegion}
                background={
                  'linear-gradient(195deg, rgba(250,180,45,1) 0%, rgba(235,159,22,1) 100%)'
                }
                title={'Quantidade por estados'}
                text={'Equipamentos'}
              />
            </div>
            <div className='col-md-4 mb-3'>
              <UIPLineChart
                data={completedServicesData}
                background={
                  'linear-gradient(195deg, rgba(24,161,66,1) 0%, rgba(8,115,7,1) 100%)'
                }
                title={'Quantidade mensal'}
                text={'Concluídos'}
              />
            </div>
          </div>
        </div>
        <div className='machines-content'>
          <div className='row'>
            <div className='col mb-4'>
              <UIPDowntimeTable />
            </div>
            <div className='col-xxl-3'>
              <UIPMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
