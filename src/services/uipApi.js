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
