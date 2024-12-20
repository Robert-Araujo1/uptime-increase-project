import axios from 'axios';
import { SERVER } from './constants';
import PropTypes from 'prop-types';

async function requestApi(url, method = 'GET', data = {}) {
  try {
    const response = await axios({
      method: method,
      baseURL: SERVER,
      url: url,
      headers: { Authorization: localStorage.getItem('idToken') },
      data: method !== 'GET' ? data : undefined,
    });
    return response.data;
  } catch (err) {
    console.error('Error on request uip API. \n', err);
  }
}

export async function getMachines() {
  return await requestApi('/stopped-machines');
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

export async function createWMOrder(data) {
  return await requestApi('/workshop-management/create-order', 'PUT', data);
}

export async function getWMOrders() {
  return await requestApi('/workshop-management/orders');
}

export async function editWMOrder(data) {
  return await requestApi('/workshop-management/edit-order', 'PATCH', data);
}

export async function updateStatusWMOrder(data) {
  return await requestApi('/workshop-management/update-status', 'PATCH', data);
}

export async function getWMInsights() {
  return await requestApi('/workshop-management/insights');
}

export async function getPopsMachines() {
  return await requestApi('/pops/machines');
}

export async function submitPopsForms(data) {
  return await requestApi('/pops/submit-form', 'POST', data);
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
