import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import i18next from '../../../i18n/i18n';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ServerDay from './ServerDay';
import ReportIcon from '@mui/icons-material/Report';
import styles from '../utils/styles';
import getMachineCategoryIcon from '../../../utils/getMachineCategoryIcon';
import { UIPModalProps } from '../types/MachineHistoryModalProps';

export default ({
  openModal,
  onClose,
  highlightedDays,
  dtcs,
  setSelectedDate,
  machineSelected,
  selectedDate,
}: UIPModalProps) => (
  <Modal open={openModal} onClose={onClose}>
    <Box sx={styles.machineHistoryModal.container}>
      <Box sx={styles.modal.header}>
        <Typography variant='h6'>
          {i18next.t('home.machines.machineData.title')}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            dayOfWeekFormatter={(_day, weekday) => weekday.format('ddd')}
            disableFuture
            disableHighlightToday
            minDate={dayjs(highlightedDays[0])}
            maxDate={dayjs(highlightedDays[highlightedDays.length - 1])}
            slots={{
              day: (props) => (
                <ServerDay
                  dtcs={dtcs}
                  highlightedDays={highlightedDays}
                  {...props}
                />
              ),
            }}
            onChange={(value) =>
              setSelectedDate(dayjs(value).format('DD/MM/YYYY'))
            }
          />
        </LocalizationProvider>
        {machineSelected.hasOwnProperty('MachineCategory') && (
          <Box sx={styles.machineHistoryModal.machine}>
            <Box sx={{ display: 'flex', marginBottom: 2 }}>
              <img
                src={getMachineCategoryIcon(machineSelected.MachineCategory)}
                style={styles.machineHistoryModal.icon}
              />
              <Box>
                <Typography style={{ fontWeight: 'bold' }}>
                  {machineSelected.CustomerName}
                </Typography>
                <Typography style={{ fontSize: 14 }}>
                  {machineSelected.MachineVin}
                </Typography>
              </Box>
            </Box>
            {selectedDate && <Typography>Alertas - {selectedDate}</Typography>}
            {machineSelected.MachineOperations?.map(
              ({ dtcs }) =>
                typeof dtcs === 'object' &&
                dtcs.length > 0 &&
                dtcs.map(
                  (dtc, index) =>
                    dayjs(dtc.timestamp).format('DD/MM/YYYY') ==
                      selectedDate && (
                      <Box key={index} display='flex'>
                        <ReportIcon
                          fontSize='small'
                          color={
                            dtc.severity == 'INFO' || dtc.severity == 'LOW'
                              ? 'primary'
                              : dtc.severity == 'MEDIUM'
                                ? 'warning'
                                : dtc.severity == 'HIGH'
                                  ? 'error'
                                  : 'action'
                          }
                        />
                        <Typography fontSize={13}>{dtc.description}</Typography>
                      </Box>
                    )
                )
            )}
          </Box>
        )}
      </Box>
    </Box>
  </Modal>
);
