export default ({ text, idBtn }) => {
  return (
    <button
      id={idBtn}
      type='submit'
      className='auth-btn btn btn-outline-primary w-100'>
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
