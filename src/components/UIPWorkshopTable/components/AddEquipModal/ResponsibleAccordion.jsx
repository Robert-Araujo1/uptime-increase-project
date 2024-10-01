import UIPAccordion from '../../../UIPAccordion';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import { useState } from 'react';
import { responsibleItems, companyItems } from '../../constants/items';
import { useDispatch } from 'react-redux';
import { updateWMOrder } from '../../../../features/workshop-management-order/wmOrderSlice';

export default () => {
  const [responsible, setResponsible] = useState('');
  const dispatch = useDispatch();
  const handleResponsibleChange = (e) => {
    setResponsible(e.target.value.type);
    dispatch(
      updateWMOrder({ type: 'Responsible', value: e.target.value.type })
    );
  };
  const handleCompanyChange = (e) => {
    dispatch(updateWMOrder({ type: 'Company', value: e.target.value.type }));
  };
  const handleEmailChange = (e) => {
    dispatch(updateWMOrder({ type: 'ResponsibleUser', value: e.target.value }));
  };
  return (
    <UIPAccordion defaultExpanded title='Informações do Responsável'>
      <UIPCustomSelectInput
        items={responsibleItems}
        id='responsible-type-select'
        label='Responsável'
        onChange={handleResponsibleChange}
      />
      {responsible === 'dealer' && (
        <>
          <UIPCustomModalInput
            required={responsible === 'dealer'}
            id='responsible-name-select'
            label='Email do Responsável'
            onChange={handleEmailChange}
          />
        </>
      )}
      <UIPCustomSelectInput
        required={responsible === 'dealer'}
        id='company-select'
        onChange={handleCompanyChange}
        label='Selecione o Concessionário'
        items={companyItems}
      />
    </UIPAccordion>
  );
};
