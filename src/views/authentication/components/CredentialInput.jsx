export default ({ type, placeholder, lbl }) => {
  return (
    <div className='form-group mb-3'>
      <label className='form-label fw-light'>{lbl}</label>
      <input
        id={type}
        type={type}
        className='form-control'
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};
