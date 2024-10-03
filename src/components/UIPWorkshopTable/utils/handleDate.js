import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default (date) => {
  const t = dayjs(date).format('HH:mm');

  return dayjs(date).isToday()
    ? `Hoje, às ${t}`
    : dayjs(date).isYesterday()
      ? `Ontem, às ${t}`
      : dayjs(date).format('DD/MM/YYYY HH:mm');
};
