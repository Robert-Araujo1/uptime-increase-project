export default (event) => {
  event.preventDefault();

  const formDoc = document.querySelector('form');
  if (!formDoc.checkValidity()) return false;

  return true;
};
