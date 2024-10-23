import Box from '@mui/material/Box';
import AlertSeverityDot from './AlertSeverityDot';
import dayjs from 'dayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export default function (props) {
  const { day, outsideCurrentMonth, highlightedDays, dtcs, ...other } = props;
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.toString()) >= 0;
  let dtcOnDay = [];
  dtcs.forEach((dtc) =>
    dtc.map((alert) => {
      if (
        dayjs(alert.timestamp).toISOString().substring(0, 10) ==
        day.toISOString().substring(0, 10)
      ) {
        dtcOnDay.push(alert);
      }
    })
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isSelected ? (
        <AlertSeverityDot
          severity={
            dtcOnDay.length > 0 &&
            day.toISOString().substring(0, 10) ==
              dayjs(dtcOnDay[0].timestamp).toISOString().substring(0, 10)
              ? dtcs[0][0].severity
              : undefined
          }
        />
      ) : undefined}
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Box>
  );
}
