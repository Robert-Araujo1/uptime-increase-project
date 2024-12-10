import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function (date: string) {
  try {
    const dateObj = dayjs(date);
    if (dateObj.isToday()) {
      return [`Hoje, às ${dateObj.format('HH:mm')}`, 'today'];
    } else if (dateObj.isYesterday()) {
      return [`Ontem, às ${dateObj.format('HH:mm')}`, 'yesterday'];
    } else {
      return [dateObj.format('DD/MM/YYYY, HH:mm'), 'past'];
    }
  } catch (error) {
    console.error(error);
    return [date, 'error'];
  }
}
