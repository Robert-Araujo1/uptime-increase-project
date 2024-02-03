export default () => {
  return (
    <div
      className='spinner-border text-primary'
      style={{ width: '1.5rem', height: '1.5rem' }}
      role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  );
};
