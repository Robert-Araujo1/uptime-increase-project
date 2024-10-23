import { LuSignal, LuSignalHigh, LuSignalMedium } from 'react-icons/lu';
import { PiCellSignalX } from 'react-icons/pi';
import dayjs from 'dayjs';

export default ({ machine }) => {
  const size = 26;

  if (!machine.hasOwnProperty('MachineOperations')) {
    return <PiCellSignalX size={size} color='gray' />;
  }

  const mostRecentlyDate = machine.MachineOperations.reduce((a, b) =>
    dayjs(a.timestamp) > dayjs(b.timestamp) ? a : b
  ).timestamp;
  const diff = Math.round((dayjs() - dayjs(mostRecentlyDate)) / 1000 / 86400);

  return diff <= 2 ? (
    <LuSignal size={size} color='green' />
  ) : diff > 2 && diff <= 4 ? (
    <LuSignalHigh size={size} color='orange' />
  ) : (
    <LuSignalMedium size={size} color='red' />
  );
};
