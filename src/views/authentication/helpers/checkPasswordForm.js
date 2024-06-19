import checkFormValidity from './checkFormValidity';

export default function (event) {
  if (!checkFormValidity(event)) return false;
  const password = document.getElementById('password-field');
  const confirmPassword = document.getElementById('confirm-password-field');
  const rulesPassed = document.getElementsByClassName('passed');

  return password.value == confirmPassword.value && rulesPassed.length == 6
    ? true
    : false;
}
