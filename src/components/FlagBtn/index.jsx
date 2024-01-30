import i18next from 'i18next';

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

export default FlagBtn;
