import {
  LENGTH_RGX,
  UPPERCASE_RGX,
  SPECIAL_CHARS_RGX,
  NUMBER_RGX,
  LOWERCASE_RGX,
} from '../helpers/passwordValidation';
export default ({ password, confirmPassword }) => {
  const rules = [
    { label: 'Mínimo 8 caracteres', pattern: LENGTH_RGX },
    { label: 'Pelo menos 1 letra minúscula', pattern: LOWERCASE_RGX },
    { label: 'Pelo menos 1 letra maiúscula', pattern: UPPERCASE_RGX },
    { label: 'Pelo menos 1 número', pattern: NUMBER_RGX },
    { label: 'Pelo menos 1 caractere especial', pattern: SPECIAL_CHARS_RGX },
  ];
  return (
    <div className='wrapper'>
      <p>Regras para nova senha:</p>
      {rules.map((rule, index) => {
        const cls = password && password.match(rule.pattern) ? 'passed' : '';
        return (
          <div key={index}>
            <span className={cls}>{rule.label}</span>
            <br />
          </div>
        );
      })}
      <div>
        <span
          className={password && password == confirmPassword ? 'passed' : ''}>
          As senhas são iguais
        </span>
        <br />
      </div>
    </div>
  );
};
