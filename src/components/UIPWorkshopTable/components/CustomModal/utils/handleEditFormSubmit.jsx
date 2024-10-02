import { validateToken } from '../../../../../services/authentication';
import { editWMOrder } from '../../../../../services/uipApi';
import dayjs from 'dayjs';

export default async function (order) {
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
    const response = await editWMOrder({
      ...order,
      LastServiceStatusTimestamp: timestamp,
      LastServiceStatusUser: user,
      LastServiceStatusUserRole: groups,
    });

    if (response?.statusCode == '200') {
      alert('Equipamento editado com sucesso');
    } else {
      alert('Erro ao editar o equipamento');
      console.error(response);
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}
