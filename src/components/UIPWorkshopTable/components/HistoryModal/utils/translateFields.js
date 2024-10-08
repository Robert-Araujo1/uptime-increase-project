export default (label) => {
  switch (label) {
    case 'Company':
      return 'Concessionário';

    case 'CustomerName':
      return 'Cliente';

    case 'ExpectedDateToFinish':
      return 'Data Prevista para Liberação';

    case 'LastFailureType':
      return 'Tipo de Falha';

    case 'LastServiceDescription':
      return 'Descrição do Serviço';

    case 'ResponsibleUser':
      return 'Email do Responsável';

    case 'Responsible':
      return 'Responsável';

    case 'MachineVin':
      return 'Chassi';

    case 'MachineStoppedSince':
      return 'Data da Parada';

    case 'MachineLocation':
      return 'Localização da Máquina';

    case 'MachineEngineHours':
      return 'Horímetro';

    case 'LastServiceStatusUser':
      return 'Usuário Responsável pela Atualização';

    case 'LastServiceStatus':
      return 'Status do Serviço';

    default:
      return label;
  }
};
