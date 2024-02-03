import UIPLoadingEffect from '../../../components/UIPLoadingEffect';
import { renderToString } from 'react-dom/server';

export default ({ text, idBtn }) => {
  return (
    <button
      id={idBtn}
      type='submit'
      className='btn btn-outline-primary w-50'
      onClick={() => {
        var buttonContent = document.getElementById(idBtn);
        buttonContent.innerHTML = renderToString(<UIPLoadingEffect />);
      }}>
      {text}
    </button>
  );
};
