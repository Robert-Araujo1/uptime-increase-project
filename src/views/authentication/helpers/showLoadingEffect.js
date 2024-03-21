export default (idBtn) => {
  const buttonContent = document.getElementById(idBtn);
  buttonContent.setAttribute('disabled', 'disabled');

  buttonContent
    .getElementsByClassName('loading-spinner')[0]
    .classList.add('spinner-border', 'spinner-border-sm', 'mx-2');

  buttonContent.getElementsByClassName('text-btn')[0].innerHTML = '';
};
