import axios from 'axios';
import { SERVER } from './constants';

async function requestApi(url) {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: SERVER,
      url: url,
      headers: { Authorization: localStorage.getItem('idToken') },
    });
    return response.data;
  } catch (err) {
    console.error('Error on request uip API. \n', err);
  }
}

export async function getMachines() {
  return await requestApi('/get-stopped-machines');
}

export async function getVehicles() {
  return await requestApi('/get-vehicles-location');
}

export async function getInsightData() {
  return await requestApi('/insight-data');
}

export async function updateOrder(data) {
  return await requestApi('/orders/update-order', 'PATCH', data);
}

updateOrder.propTypes = {
  data: PropTypes.shape({
    OrderId: PropTypes.string.isRequired,
    CustomerName: PropTypes.string.isRequired,
    User: PropTypes.string.isRequired,
    Role: PropTypes.arrayOf(PropTypes.string).isRequired,
    LastServiceStatusTimestamp: PropTypes.string.isRequired,
    LastServiceStatus: PropTypes.oneOf(['in-progress', 'completed']).isRequired,
    LastServiceStatusDescription: PropTypes.string,
    ContactName: PropTypes.string,
    ContactPhone: PropTypes.string,
    ContactType: PropTypes.oneOf([
      'phone',
      'email',
      'whatsapp',
      'other-contact-type',
    ]),
    DowntimeReason: PropTypes.oneOf([
      'broken-machine',
      'building-work-stopped',
      'no-contract',
      'waiting-service',
      'machine-not-stopped',
      'other-downtime-reason',
    ]),
    LastServiceStatusDescription: PropTypes.string,
  }),
};
