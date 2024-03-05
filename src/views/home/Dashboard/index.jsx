import UIPInsightCard from '../../../components/UIPInsightCard';
import UIPDowntimeTable from '../../../components/UIPDowntimeTable';
import UIPMap from '../../../components/UIPMap';
import { cardsInfo, chartsInfo } from './infos';
import UIPLineChart2 from '../../../components/UIPCharts/UIPLineChart2';
import UIPChart from '../../../components/UIPCharts/UIPChart';
import { Card, Box, Typography } from '@mui/material';

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
            <div className='col-md-8 mb-3'>
              <UIPChart
                chart={<UIPLineChart2 />}
                background={
                  'linear-gradient(195deg, rgba(32,148,142,1) 0%, rgba(15,92,85,1) 100%)'
                }
                title={'Tempo Médio de Parada'}
                text={'Máquina Parada por Região'}
                height={'100%'}
              />
            </div>
            <div className='col-md-4 mb-3'>
              <Card sx={{ height: '100%', padding: 2 }}>
                <Box>
                  <Typography variant='h6' fontWeight={600} color={'#2D4A5D'}>
                    Atualizações
                  </Typography>
                </Box>
              </Card>
            </div>
          </div>
        </div>
        <div className='machines-content d-none'>
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
