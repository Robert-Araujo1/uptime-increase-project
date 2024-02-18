import { useState } from 'react';

export default ({ type, placeholder, lbl, id, onChange, onCopyPaste }) => {
  const [isPswVisible, setIsPswVisible] = useState(false);

  const togglePasswordVisibility = () => {
    const pswInput = document.getElementById(id);
    if (pswInput.type === 'password') {
      pswInput.type = 'text';
      setIsPswVisible(true);
    } else {
      pswInput.type = 'password';
      setIsPswVisible(false);
    }
  };
  return (
    <div className='form-group mb-3'>
      <label className='form-label fw-light'>{lbl}</label>
      <div className='d-flex align-items-center'>
        <input
          id={id}
          type={type}
          className='form-control'
          placeholder={placeholder}
          required={true}
          onChange={onChange}
          onPaste={onCopyPaste}
          onCopy={onCopyPaste}
        />
        {type === 'password' && (
          <button
            style={{
              right: '5%',
              opacity: 0.4,
              position: 'absolute',
              border: 'none',
              outline: 'none',
              background: 'none',
            }}
            type='button'
            onClick={togglePasswordVisibility}>
            {!isPswVisible ? (
              <i className='fa-regular fa-eye'></i>
            ) : (
              <i className='fa-regular fa-eye-slash'></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
