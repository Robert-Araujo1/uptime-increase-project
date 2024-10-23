export type DtcsMachineOperationsProps = {
  timestamp: string;
  severity: string;
  description: string;
};

export type MachineOperationsProps = {
  dtcs: DtcsMachineOperationsProps[];
};

export interface MachineSelectedProps {
  MachineCategory: string;
  CustomerName: string;
  MachineVin: string;
  MachineOperations: MachineOperationsProps[];
  MachineCity?: string;
  MachineStateAcronym?: string;
  LastServiceStatus?: string;
}

export interface UIPModalProps {
  openModal: boolean;
  onClose: (row: any) => void;
  highlightedDays: string[];
  dtcs: any[];
  setSelectedDate: (value: any) => void;
  machineSelected: MachineSelectedProps;
  selectedDate: string | undefined;
}
