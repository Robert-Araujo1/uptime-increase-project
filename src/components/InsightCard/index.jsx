export default ({ cardTitle, insightIcon, backgroundIcon }) => {
  return (
    <div className='col-md-4 my-3'>
      <div className='card insight-card'>
        <div className='row'>
          <div className='col-md-4 text-center d-flex justify-content-center'>
            <div
              style={{ backgroundColor: backgroundIcon }}
              className='insight-card-icon d-flex align-items-center justify-content-center rounded'>
              {insightIcon}
            </div>
          </div>
          <div className='col-md-8 text-end'>
            <div className='card-body'>
              <span className='card-title fw-light'>{cardTitle}</span>
              <br />
              <span>cardValue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
