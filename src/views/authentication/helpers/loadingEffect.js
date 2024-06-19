export const showLoadingEffect = (idBtn) => {
  const buttonContent = document.getElementById(idBtn);
  buttonContent.setAttribute('disabled', 'disabled');

  buttonContent
    .getElementsByClassName('loading-spinner')[0]
    .classList.add('spinner-border', 'spinner-border-sm', 'mx-2');

  buttonContent.getElementsByClassName('text-btn')[0].innerHTML = '';
};

export const removeLoadingEffect = (idBtn, buttonName) => {
  const buttonContent = document.getElementById(idBtn);
  buttonContent.removeAttribute('disabled');
  buttonContent
    .getElementsByClassName('loading-spinner')[0]
    .classList.remove('spinner-border', 'spinner-border-sm', 'mx-2');

  buttonContent.getElementsByClassName('text-btn')[0].innerHTML = buttonName;
};
