import dayjs from 'dayjs';

export default (row) => {
  const today = dayjs();
  const machineStoppedSince = dayjs(row.MachineStoppedSince);

  if (row?.LastServiceStatus === 'completed') {
    const expectedDateToFinish = dayjs(row.ExpectedDateToFinish);
    return expectedDateToFinish.diff(machineStoppedSince, 'days');
  }

  return today.diff(machineStoppedSince, 'days');
};
