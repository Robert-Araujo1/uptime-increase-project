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

export default function ({ openAddEquipModal, setOpenAddEquipModal }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const order = useSelector((state) => state.wmOrder.order);

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return;

    setOpenAddEquipModal(false);
    dispatch(clearWMOrder());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const handling = await handleFormSubmit(order);
    if (handling?.statusCode == '200') {
      handleClose();
    }
    setLoading(false);
  };

  return (
    <Modal
      method='dialog'
      component='form'
      open={openAddEquipModal}
      onClose={handleClose}
      onSubmit={handleSubmit}>
      <Box sx={styles.addEquipModal.container}>
        <Header handleClose={handleClose} />
        <ResponsibleAccordion />
        <MachineAccordion />
        <StoppedReasonAccordion />
        <DoubleButtons handleClose={handleClose} loading={loading} />
      </Box>
    </Modal>
  );
}
