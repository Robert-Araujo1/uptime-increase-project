import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import UIPAccordion from '../../UIPAccordion';
import UIPCustomModalInput from '../../UIPCustomModalInput';
import UIPCustomSelectInput from '../../UIPCustomSelectInput';
import styles from '../utils/styles';
import getMachineCategoryIcon from '../../../utils/getMachineCategoryIcon';
import { MuiTelInput } from 'mui-tel-input';
import { MachineSelectedProps } from '../types/MachineHistoryModalProps';
import { inputProps } from '../utils/props';
import { contactTypes, downtimeReasons } from '../utils/constants';
import { handleService } from '..';
import { MutableRefObject, useState } from 'react';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

interface CompleteServiceModalProps {
  openModal: boolean;
  onClose: () => void;
  machineSelected: MachineSelectedProps;
  setMessageSnackbar: (value: string) => void;
  setSeveritySnackbar: (value: string) => void;
  setOpenSnackbar: (value: boolean) => void;
  apiRef: MutableRefObject<GridApiCommunity>;
  setOpenBackdrop: (value: boolean) => void;
  setAnchorEl: (value: any) => void;
  setMachineSelected: (value: MachineSelectedProps) => void;
  setOpenCompleteServiceModal: (value: boolean) => void;
}

export default function ({
  openModal,
  machineSelected,
  setMessageSnackbar,
  setSeveritySnackbar,
  setOpenSnackbar,
  apiRef,
  setOpenBackdrop,
  setAnchorEl,
  setMachineSelected,
  setOpenCompleteServiceModal,
}: CompleteServiceModalProps) {
  const [customerName, setCustomerName] = useState<any>('');
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [contactType, setContactType] = useState<any>('');
  const [downtimeReason, setDowntimeReason] = useState<any>('');

  const handleCloseModal = () => {
    setOpenCompleteServiceModal(false);
    setCustomerName('');
    setPhoneNumber('');
    setDescription('');
    setContactType('');
    setDowntimeReason('');
  };

  const handleSubmit = async () => {
    if (
      customerName == '' ||
      phoneNumber == '' ||
      contactType == '' ||
      downtimeReason == '' ||
      description == ''
    ) {
      setMessageSnackbar('Preencha todos os campos obrigatórios.');
      setSeveritySnackbar('error');
      setOpenSnackbar(true);
      return;
    }
    handleService(
      apiRef,
      setOpenBackdrop,
      setAnchorEl,
      setMessageSnackbar,
      setSeveritySnackbar,
      setOpenSnackbar,
      setMachineSelected,
      'completed',
      machineSelected,
      customerName,
      phoneNumber,
      description,
      contactType,
      downtimeReason
    );
    setOpenCompleteServiceModal(false);
    setCustomerName('');
    setPhoneNumber('');
    setDescription('');
    setContactType('');
    setDowntimeReason('');
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={styles.completeServiceModal.container}>
        <Box sx={styles.modal.header}>
          <Typography variant='h6' sx={styles.modal.title}>
            Concluir atendimento
          </Typography>
          <IconButton sx={styles.modal.title} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box my={1} component='form'>
          <UIPAccordion defaultExpanded={false} title='Informações da Máquina'>
            <Box sx={styles.completeServiceModal.machine}>
              <img
                style={styles.completeServiceModal.icon}
                src={
                  machineSelected?.MachineCategory &&
                  getMachineCategoryIcon(machineSelected.MachineCategory)
                }
              />
              <Typography sx={{ px: 2 }}>
                {machineSelected?.MachineVin}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Organização: {machineSelected?.CustomerName}
              </Typography>
              <Typography>
                Localização:{' '}
                {`${machineSelected?.MachineCity} - ${machineSelected?.MachineStateAcronym}`}
              </Typography>
            </Box>
          </UIPAccordion>
          <UIPAccordion defaultExpanded title='Informações do Cliente'>
            <UIPCustomModalInput
              onChange={(event: any) => {
                setCustomerName(event.target.value);
              }}
              label='Nome'
              id='customer-contact-name'
            />
            <MuiTelInput
              value={phoneNumber}
              onChange={(newPhone) => setPhoneNumber(newPhone)}
              size='small'
              id='phone-contact-name'
              defaultCountry='BR'
              label='Telefone'
              required
              fullWidth
              InputLabelProps={inputProps}
              inputProps={inputProps}
              sx={{ marginBottom: 3 }}
            />
            <UIPCustomSelectInput
              items={contactTypes}
              label='Tipo de Contato'
              onChange={(event: any) => setContactType(event.target.value.type)}
            />
          </UIPAccordion>
          <UIPAccordion defaultExpanded title='Informações do Atendimento'>
            <UIPCustomSelectInput
              items={downtimeReasons}
              label='Motivo da inatividade da máquina'
              onChange={(event: any) => setDowntimeReason(event.target.value)}
            />
            <UIPCustomModalInput
              label='Descrição do atendimento'
              id='observations-complete-service'
              height={100}
              multiline
              maxLength={150}
              onChange={handleDescriptionChange}
              helperText={`${description.length}/150 caracteres`}
              sx={styles.completeServiceModal.description}
            />
          </UIPAccordion>
          <Box sx={{ textAlign: 'right', my: 2 }}>
            <Button color='success' variant='contained' onClick={handleSubmit}>
              Concluir
            </Button>
            <Button
              onClick={handleCloseModal}
              sx={{ marginLeft: 2 }}
              color='error'
              variant='contained'>
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
