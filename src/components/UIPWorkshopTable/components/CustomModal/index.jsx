import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../../styles';
import Header from './Header';
import StoppedReasonAccordion from './StoppedReasonAccordion';
import MachineAccordion from './MachineAccordion';
import ResponsibleAccordion from './ResponsibleAccordion';
import DoubleButtons from './DoubleButtons';
import handleFormSubmit from './utils/handleFormSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { clearWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';
import 'dayjs/locale/pt-br.js';

export default function ({ openModal, setOpenModal, title, service }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.wmOrder.order);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return;

    setOpenModal(false);
    dispatch(clearWMOrder());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const handling = await handleFormSubmit(order, service);
    if (handling?.statusCode == '200') {
      window.location.reload();
      return;
    }
    setLoading(false);
  };

  return (
    <Modal
      method='dialog'
      component='form'
      open={openModal}
      onClose={handleClose}
      onSubmit={handleSubmit}>
      <Box sx={styles.CustomModal.container}>
        <Header title={title} handleClose={handleClose} />
        {title !== 'Atualizar Status' && (
          <>
            <ResponsibleAccordion />
            <MachineAccordion />
          </>
        )}
        {title !== 'Editar Equipamento' && (
          <StoppedReasonAccordion title={title} />
        )}
        <DoubleButtons handleClose={handleClose} loading={loading} />
      </Box>
    </Modal>
  );
}
