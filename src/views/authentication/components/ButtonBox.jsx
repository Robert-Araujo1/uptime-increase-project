export default ({ text, idBtn }) => {
  return (
    <button
      id={idBtn}
      type='submit'
      className='btn btn-outline-primary w-100'
      onClick={() => {
        const formDoc = document.querySelector('form');
        if (!formDoc.checkValidity()) return;

        const buttonContent = document.getElementById(idBtn);

        buttonContent
          .getElementsByClassName('loading-spinner')[0]
          .classList.add('spinner-border', 'spinner-border-sm', 'mx-2');

        buttonContent.getElementsByClassName('text-btn')[0].innerHTML =
          'Loading';
      }}>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <span
          className='loading-spinner'
          role='status'
          aria-hidden='true'></span>
        <span className='text-btn'>{text}</span>
      </div>
    </button>
  );
};
