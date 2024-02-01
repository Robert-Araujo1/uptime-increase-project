import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';

function Dashboard() {
  const cardsInfo = [
    { cardTitle: 'Atendidos', iconStyle: 'started' },
    { cardTitle: 'Em atendimento', iconStyle: 'in-progress' },
    { cardTitle: 'Não atendidos', iconStyle: 'not-started' },
    { cardTitle: 'Total de equipamentos', iconStyle: 'total' },
  ];

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='insights py-4'>
          <div className='row'>
            {cardsInfo.map(({ cardTitle, iconStyle }) => (
              <div className='col'>
                <UIPInsightCard cardTitle={cardTitle} iconStyle={iconStyle} />
              </div>
            ))}
          </div>
        </div>
        <div className='machines-content'>
          <div className='row'>
            <div className='col'>
              <UIPDowntimeTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
