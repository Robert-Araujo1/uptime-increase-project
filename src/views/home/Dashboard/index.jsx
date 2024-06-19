import UIPInsightCard from '../../../components/UIPInsightCard';
import { cardsInfo, chartsInfo } from './infos';
import UIPLineChart2 from '../../../components/UIPCharts/UIPLineChart2';
import UIPChart from '../../../components/UIPCharts/UIPChart';
import UIPUserUpdates from '../../../components/UIPUserUpdates';
import i18next from '../../../i18n/i18n';

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
          <div className='row mb-4'>
            <div className='col-xl-8 mb-3'>
              <UIPChart
                chart={<UIPLineChart2 />}
                background={
                  'linear-gradient(195deg, rgba(32,148,142,1) 0%, rgba(15,92,85,1) 100%)'
                }
                title={i18next.t(
                  'home.dashboard.charts.averageDowntimeChart.title'
                )}
                text={i18next.t(
                  'home.dashboard.charts.averageDowntimeChart.description'
                )}
              />
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

export default Dashboard;
