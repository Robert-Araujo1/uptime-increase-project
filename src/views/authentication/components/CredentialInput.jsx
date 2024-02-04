export default ({ type, placeholder, lbl, id }) => {
  return (
    <div className='form-group mb-3'>
      <label className='form-label fw-light'>{lbl}</label>
      <input
        id={id}
        type={type}
        className='form-control'
        placeholder={placeholder}
        required={true}
      />
    </div>
  );
};
