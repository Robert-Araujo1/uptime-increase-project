export default ({ severity }) => {
  if (!severity) return;

  let color;
  switch (severity) {
    case 'INFO':
    case 'LOW':
      color = 'blue';
      break;
    case 'HIGH':
      color = 'red';
      break;
    case 'MEDIUM':
      color = 'orange';
      break;
    default:
      color = 'gray';
      break;
  }
  return (
    <div className='severity-dtc-dot' style={{ background: color }}>
      <div></div>
    </div>
  );
};
