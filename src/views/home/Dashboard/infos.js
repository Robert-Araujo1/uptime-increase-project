import i18next from '../../../i18n/i18n';
import averageServiceTimeData from '../../../assets/data/charts/averageServiceTimeData';
import completedServicesData from '../../../assets/data/charts/completedServicesData';
import equipPerRegion from '../../../assets/data/charts/equipPerRegion';
import UIPLineChart from '../../../components/UIPCharts/UIPLineChart';
import UIPBarChart from '../../../components/UIPCharts/UIPBarChart';

export const cardsInfo = [
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
    cardValue: 126,
  },
];

export const chartsInfo = [
  <UIPLineChart
    data={averageServiceTimeData}
    background={'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))'}
    title={i18next.t('home.dashboard.charts.averageServiceTimeChart.title')}
    text={i18next.t(
      'home.dashboard.charts.averageServiceTimeChart.description'
    )}
  />,
  <UIPBarChart
    data={equipPerRegion}
    background={
      'linear-gradient(195deg, rgba(250,180,45,1) 0%, rgba(235,159,22,1) 100%)'
    }
    title={i18next.t('home.dashboard.charts.equiptPerStateChart.title')}
    text={i18next.t('home.dashboard.charts.equiptPerStateChart.description')}
  />,
  <UIPLineChart
    data={completedServicesData}
    background={
      'linear-gradient(195deg, rgba(24,161,66,1) 0%, rgba(8,115,7,1) 100%)'
    }
    title={i18next.t('home.dashboard.charts.completedServiceChart.title')}
    text={i18next.t('home.dashboard.charts.completedServiceChart.description')}
  />,
];
