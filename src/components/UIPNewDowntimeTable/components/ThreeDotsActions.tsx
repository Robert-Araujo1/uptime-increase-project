import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MachineSelectedProps } from '../types/MachineHistoryModalProps';
import { handleService } from '..';
import { MutableRefObject } from 'react';
import { GridApiCommunity } from '@mui/x-data-grid/internals';

interface ThreeDotsActionsProps {
  openMenu: boolean;
  anchorEl: any;
  setAnchorEl: (value: any) => void;
  handleMenuItemClick: () => void;
  machineSelected: MachineSelectedProps;
  apiRef: MutableRefObject<GridApiCommunity>;
  setOpenBackdrop: (value: boolean) => void;
  setMessageSnackbar: (value: string) => void;
  setSeveritySnackbar: (value: string) => void;
  setOpenSnackbar: (value: boolean) => void;
  setMachineSelected: (value: MachineSelectedProps) => void;
  setOpenCompleteServiceModal: (value: boolean) => void;
  setOpenHistoryModal: (value: boolean) => void;
}

export default function ({
  openMenu,
  anchorEl,
  setAnchorEl,
  handleMenuItemClick,
  machineSelected,
  apiRef,
  setOpenBackdrop,
  setMessageSnackbar,
  setSeveritySnackbar,
  setOpenSnackbar,
  setMachineSelected,
  setOpenCompleteServiceModal,
  setOpenHistoryModal,
}: ThreeDotsActionsProps) {
  return (
    <Menu open={openMenu} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
      <MenuItem onClick={handleMenuItemClick}>
        Ver histórico da máquina
      </MenuItem>
      {machineSelected.LastServiceStatus == 'not-started' ? (
        <MenuItem
          onClick={async () =>
            handleService(
              apiRef,
              setOpenBackdrop,
              setAnchorEl,
              setMessageSnackbar,
              setSeveritySnackbar,
              setOpenSnackbar,
              setMachineSelected,
              'in-progress',
              machineSelected
            )
          }>
          Iniciar atendimento
        </MenuItem>
      ) : machineSelected.LastServiceStatus == 'in-progress' ? (
        <MenuItem
          onClick={() => {
            setOpenCompleteServiceModal(true);
            setAnchorEl(null);
          }}>
          Encerrar atendimento
        </MenuItem>
      ) : machineSelected.LastServiceStatus == 'completed' ? (
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setOpenHistoryModal(true);
          }}>
          Ver histórico do atendimento
        </MenuItem>
      ) : undefined}
    </Menu>
  );
}
