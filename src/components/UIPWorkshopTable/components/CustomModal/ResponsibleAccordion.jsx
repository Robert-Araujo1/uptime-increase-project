import UIPAccordion from '../../../UIPAccordion';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import { useState } from 'react';
import { responsibleItems, companyItems } from '../../constants/items';
import { useDispatch, useSelector } from 'react-redux';
import { updateWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';

export default () => {
  const order = useSelector((state) => state.wmOrder.order);

  const [responsible, setResponsible] = useState(order?.Responsible ?? '');
  const dispatch = useDispatch();

  const handleResponsibleChange = (e) => {
    setResponsible(e.target.value);
    dispatch(updateWMOrder({ type: 'Responsible', value: e.target.value }));
  };
  const handleCompanyChange = (e) => {
    dispatch(updateWMOrder({ type: 'Company', value: e.target.value }));
  };
  const handleEmailChange = (e) => {
    dispatch(updateWMOrder({ type: 'ResponsibleUser', value: e.target.value }));
  };

  return (
    <UIPAccordion defaultExpanded title='Informações do Responsável'>
      <UIPCustomSelectInput
        items={responsibleItems}
        value={order?.Responsible ?? ''}
        id='responsible-type-select'
        label='Responsável'
        onChange={handleResponsibleChange}
      />
      {responsible === 'dealer' && (
        <>
          <UIPCustomModalInput
            required={responsible === 'dealer'}
            value={order?.ResponsibleUser || ''}
            id='responsible-name-select'
            label='Email do Responsável'
            onChange={handleEmailChange}
          />
        </>
      )}
      <UIPCustomSelectInput
        value={order?.Company || ''}
        id='company-select'
        onChange={handleCompanyChange}
        label='Selecione o Concessionário'
        items={companyItems}
      />
    </UIPAccordion>
  );
};
