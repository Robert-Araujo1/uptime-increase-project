import fakeUsers from '../../services/fakeUsers';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import i18next from '../../i18n/i18n';
import {
  getRandomValue,
  generateRandomPinMachine,
} from '../../assets/data/utils/dataManipulation';

export default function () {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <Card
      sx={{
        maxHeight: 390,
        padding: 2,
        background: 'var(--dark-background-2)',
      }}>
      <Box mb={3}>
        <Typography variant='h6' sx={{ color: 'var(--light-text)' }}>
          {i18next.t('home.dashboard.lastUpdates.title')}
        </Typography>
        <hr style={{ color: 'var(--light-text)' }} />
      </Box>
      <Box
        sx={{
          height: 300,
          overflow: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}>
        <h2 style={{ color: 'var(--light-text)' }}>Em breve</h2>
      </Box>
    </Card>
  );
}

const LoadingSkeleton = () => (
  <Stack display={'flex'} flexDirection={'row'} mb={4}>
    <Skeleton variant='circular' width={40} height={40} sx={{ mr: 2 }} />
    <Skeleton variant='text' width={'90%'} />
  </Stack>
);

const UserAction = ({ status, statusColor }) => (
  <span>
    {i18next.t('home.dashboard.lastUpdates.action')}{' '}
    {generateRandomPinMachine()} {i18next.t('genericsWords.to')}
    <span style={{ color: statusColor, fontWeight: 'bold' }}> {status}</span>
  </span>
);

function FakeUsers({ user, index }) {
  const actions = [
    <UserAction
      status={i18next.t('home.dashboard.inProgressType')}
      statusColor={'#1a73e8'}
    />,
    <UserAction
      status={i18next.t('home.dashboard.completedType')}
      statusColor={'#087307'}
    />,
  ];
  const updateTimes = [
    i18next.t('home.dashboard.lastUpdates.minutesAgo', { n: 12 }),
    i18next.t('home.dashboard.lastUpdates.minutesAgo', { n: 46 }),
    i18next.t('home.dashboard.lastUpdates.hoursAgo', { n: 1 }),
    i18next.t('home.dashboard.lastUpdates.hoursAgo', { n: 3 }),
    i18next.t('home.dashboard.lastUpdates.hoursAgo', { n: 4 }),
  ];
  return (
    <div className='mb-4'>
      <Box display={'flex'}>
        <img
          src={user?.picture?.large}
          alt='user'
          width='30'
          height='30'
          className='rounded-circle'
          style={{ marginRight: 10 }}
        />
        <Box display={'flex'} flexDirection={'column'}>
          <Box pr={3}>
            <Typography variant='span' fontWeight={600} fontSize={14}>
              {user?.name?.first + ' ' + user?.name?.last + ' '}
            </Typography>
            <Typography variant='p' fontSize={14}>
              {actions[getRandomValue(0, 2)]}
            </Typography>
          </Box>
          <Box>
            <Typography variant='span' fontSize={12} color={'gray'}>
              {updateTimes[index]}
            </Typography>
            <br />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
