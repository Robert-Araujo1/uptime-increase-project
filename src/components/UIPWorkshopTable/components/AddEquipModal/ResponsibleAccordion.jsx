import UIPAccordion from '../../../UIPAccordion';
import UIPCustomSelectInput from '../../../UIPCustomSelectInput';
import UIPCustomModalInput from '../../../UIPCustomModalInput';
import { useState } from 'react';
import { responsibleItems, companyItems } from '../../constants/items';

export default () => {
  const [responsible, setResponsible] = useState('');
  const handleChange = (e) => setResponsible(e.target.value.type);

  return (
    <UIPAccordion defaultExpanded title='Informações do Responsável'>
      <UIPCustomSelectInput
        items={responsibleItems}
        id='responsible-type-select'
        label='Responsável'
        onChange={handleChange}
      />
      {responsible === 'dealer' && (
        <>
          <UIPCustomModalInput
            id='responsible-name-select'
            label='Email do Responsável'
            defaultValue={localStorage.getItem('email')}
          />
          <UIPCustomSelectInput
            id='company-select'
            label='Selecione a Empresa'
            items={companyItems}
          />
        </>
      )}
    </UIPAccordion>
  );
};
