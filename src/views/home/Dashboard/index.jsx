import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import i18next from '../../../i18n/i18n';

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
