import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import { cardsInfo, chartsInfo } from './infos';

function Dashboard() {
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
            {chartsInfo.map((chart, index) => (
              <div key={index} className='col-md-4 mb-3'>
                {chart}
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
