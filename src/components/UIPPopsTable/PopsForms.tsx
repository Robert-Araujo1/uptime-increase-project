import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { Radio, RadioGroup } from '@mui/material';
import { roleCustomerOptions, yesNoOptions } from './constants';
import { popsReasonsCustomerOptions } from './constants';
import { submitPopsForms } from '../../services/uipApi';
import { capitalizeStr } from './utils';

interface PopsFormsProps {
  open: boolean;
  handleClose: () => void;
  machineDetails: any;
}

interface ClosedQuestionProps {
  question: string;
  options: any[];
  optionType?: 'radio' | 'checkbox';
  setOption?: any;
}

export default function ({
  open,
  handleClose,
  machineDetails,
}: PopsFormsProps) {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [commentary, setCommentary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProspected, setIsProspected] = useState<any>('');
  return (
    <Modal
      onSubmit={async (e: any) => {
        e.preventDefault();
        const checkboxes = e.target.querySelectorAll(
          '.checkbox-reasons-checked'
        );
        if (checkboxes.length == 0) {
          alert('Selecione pelo menos uma opção na pergunta 3.');
          return;
        }

        setLoading(true);
        let form = { StopBusinessReasons: {}, ...machineDetails } as any;
        form.CustomerPersonRole = role;
        form.CustomerPersonName = capitalizeStr(name);
        form.AdditionalCommentary = commentary;
        form.IsProspected = isProspected == 'yes' ? true : false;
        form.User = localStorage.getItem('email');

        checkboxes.forEach((checkbox: any) => {
          form.StopBusinessReasons[checkbox.value] = true;
        });

        try {
          const response = await submitPopsForms(form);
          if (response?.statusCode == 200) {
            alert('Formulário enviado com sucesso!');
            handleClose();
            window.location.reload();
          } else {
            console.error('Response:', response);
            alert('Erro ao enviar o formulário. Contate o suporte.');
          }
        } catch (error) {
          alert(
            'Ocorreu um erro ao tentar enviar o formulário. Contate o suporte.'
          );
          console.error('Error when tried to submit the form:', error);
        }
        setLoading(false);
      }}
      component='form'
      open={open}
      onClose={handleClose}>
      <Box sx={styles.formsContainer}>
        <Typography fontWeight={'bold'} textAlign={'center'} variant='h6'>
          Formulário de Acompanhamento de Visita
        </Typography>
        {machineDetails && (
          <>
            <Typography fontSize={14} textAlign={'center'}>
              {machineDetails.CustomerName}
            </Typography>
            <Typography fontSize={14} textAlign={'center'}>
              {machineDetails.MachineVin}
            </Typography>
          </>
        )}

        <FormsBody
          setRole={setRole}
          setName={setName}
          setCommentary={setCommentary}
          setIsProspected={setIsProspected}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={loading}
            type='submit'
            sx={{ width: 120 }}
            variant='contained'
            color='success'>
            {loading ? <CircularProgress size='20px' /> : 'Confirmar'}
          </Button>
          <Button onClick={handleClose} variant='contained' color='error'>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const FormsBody = ({
  setRole,
  setName,
  setCommentary,
  setIsProspected,
}: {
  setRole: any;
  setName: any;
  setCommentary: any;
  setIsProspected: any;
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <OpenQuestion
        textTransform='capitalize'
        question='1. Nome da pessoa que recebeu você durante a visita.'
        setTextFieldValue={setName}
      />
      <ClosedQuestion
        question='2. Selecione a função dessa pessoa na empresa.'
        options={roleCustomerOptions}
        setOption={setRole}
      />
      <ClosedQuestion
        question='3. Por que o cliente não faz ou parou de fazer negócios com a Veneza?'
        options={popsReasonsCustomerOptions}
        optionType='checkbox'
      />
      <ClosedQuestion
        question='4. Você conseguiu prospectar alguma oportunidade de negócio com essa visita?'
        options={yesNoOptions}
        setOption={setIsProspected}
      />
      <OpenQuestion
        required={false}
        question='Comentários adicionais'
        multiline
        rows={4}
        setTextFieldValue={setCommentary}
      />
    </Box>
  );
};

const OpenQuestion = ({
  question,
  required = true,
  textTransform = 'none',
  setTextFieldValue,
  ...textFieldProps
}: {
  question: string;
  required?: boolean;
  multiline?: boolean;
  textTransform?: 'none' | 'capitalize';
  rows?: number;
  setTextFieldValue: any;
}) => {
  return (
    <FormControl sx={{ mt: 1, width: '100%' }} required={required}>
      <FormLabel>{question}</FormLabel>
      <TextField
        hiddenLabel
        variant='filled'
        size='small'
        onChange={({ target }) => setTextFieldValue(target.value)}
        required={required}
        {...textFieldProps}
        inputProps={{ style: { textTransform: textTransform }, maxLength: 150 }}
      />
    </FormControl>
  );
};
const ClosedQuestion = ({
  question,
  options,
  optionType = 'radio',
  setOption,
}: ClosedQuestionProps) => {
  const optionsLength = options.length;
  return (
    <FormControl sx={{ mt: 1 }} required>
      <FormLabel>{question}</FormLabel>
      {optionType == 'radio' ? (
        <RadioGroup
          sx={
            optionsLength == 2
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }
              : { flexDirection: 'column' }
          }
          onChange={({ target }: { target: any }) => setOption(target.value)}>
          {options.map(({ value, label }: { value: string; label: string }) => (
            <FormControlLabel
              required
              key={value}
              value={value}
              labelPlacement={options.length > 2 ? 'end' : 'bottom'}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      ) : (
        <FormGroup
          onChange={({ target }: { target: any }) => {
            if (target.classList.contains('checkbox-reasons-checked')) {
              target.classList.remove('checkbox-reasons-checked');
            } else {
              target.classList.add('checkbox-reasons-checked');
            }
          }}>
          {options.map(({ value, label }: { value: string; label: string }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Checkbox />}
              label={label}
            />
          ))}
        </FormGroup>
      )}
    </FormControl>
  );
};
