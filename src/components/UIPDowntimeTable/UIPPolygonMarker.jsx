export default ({ text }) => {
  return (
    <div
      className={
        'polygon-marker' +
        ' ' +
        (text === 'Manual' ? 'manual-polygon-marker' : 'auto-polygon-marker')
      }>
      <div className='circle-marker'></div>
      <span>{text}</span>
    </div>
  );
};
