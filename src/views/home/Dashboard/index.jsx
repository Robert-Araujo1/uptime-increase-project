import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import i18next from '../../../i18n/i18n';

function Dashboard() {
  const cardsInfo = [
    {
      cardTitle: i18next.t('home.dashboard.completedType'),
      iconStyle: 'started',
    },
    {
      cardTitle: i18next.t('home.dashboard.inProgressType'),
      iconStyle: 'in-progress',
    },
    {
      cardTitle: i18next.t('home.dashboard.notStartedType'),
      iconStyle: 'not-started',
    },
    {
      cardTitle: i18next.t('home.dashboard.amountEquipCardTitle'),
      iconStyle: 'total',
    },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='insights py-4'>
          <div className='row'>
            {cardsInfo.map(({ cardTitle, iconStyle }) => (
              <div key={cardTitle} className='col'>
                <UIPInsightCard cardTitle={cardTitle} iconStyle={iconStyle} />
              </div>
            ))}
          </div>
        </div>
        <div className='machines-content'>
          <div className='row'>
            <div className='col mb-4'>
              <UIPDowntimeTable />
            </div>
            <div className='col-xxl-4'>
              <UIPMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
