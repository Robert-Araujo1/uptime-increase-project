export default function () {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '50px',
      }}>
      <h4
        style={{
          color: 'var(--light-text)',
          textAlign: 'center',
          marginBottom: '40px',
        }}>
        <strong>Em breve!</strong> Uma nova ferramenta desenvolvida
        especialmente para nossos CSAs, projetada para ampliar ainda mais nossa
        capilaridade de negócios!
      </h4>
      <img
        src={require('../../../assets/images/mockups/mobile-pops-conectado.png')}
        style={{ flex: 1, maxWidth: '430px', maxHeight: '430px' }}
      />
    </div>
  );
}
