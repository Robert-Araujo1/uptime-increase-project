import checkFormValidity from './checkFormValidity';

export default function (event) {
  if (!checkFormValidity(event)) return false;
  const password = document.getElementById('password-field');
  const confirmPassword = document.getElementById('confirm-password-field');

  return password.value == confirmPassword.value ? true : false;
}
