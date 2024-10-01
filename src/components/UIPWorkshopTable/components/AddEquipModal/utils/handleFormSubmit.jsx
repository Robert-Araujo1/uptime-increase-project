import dayjs from 'dayjs';
import { validateToken } from '../../../../../services/authentication';
import { createOrderWorkshop } from '../../../../../services/uipApi';

export default async (order) => {
  const timestamp = dayjs()
    .tz('America/Sao_Paulo')
    .format('YYYY-MM-DDTHH:mm:ss.SSS');

  const user = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');
  const validation = await validateToken(accessToken);

  let groups;

  if (
    validation &&
    typeof validation === 'object' &&
    validation.hasOwnProperty('cognito:groups')
  ) {
    groups = validation['cognito:groups'];
  }

  try {
    const response = await createOrderWorkshop({
      ...order,
      LastServiceStatusTimestamp: timestamp,
      OrderOwner: user,
      RoleUserOrderOwner: groups,
    });

    if (response?.statusCode == '200') {
      alert('Equipamento adicionado com sucesso');
    } else if (response?.statusCode == '400') {
      alert('Erro ao adicionar equipamento');
      console.error(response);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};
