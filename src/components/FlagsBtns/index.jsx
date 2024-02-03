import i18next from 'i18next';
import brazilFlag from '../../assets/images/brazil.png';
import usFlag from '../../assets/images/united-states.png';

function FlagBtn({ lang, srcFlag, altFlag }) {
  return (
    <button
      className='btn'
      onClick={() => {
        i18next.changeLanguage(lang);
        window.location.reload();
      }}>
      <img src={srcFlag} alt={altFlag} />
    </button>
  );
}

export default function () {
  return (
    <>
      <FlagBtn lang={'pt'} srcFlag={brazilFlag} altFlag={'Brazil Flag'} />
      <FlagBtn lang={'us'} srcFlag={usFlag} altFlag={'United States Flag'} />
    </>
  );
}
