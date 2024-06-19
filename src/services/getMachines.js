import axios from 'axios';
import { SERVER } from './constants';

export default async function () {
  try {
    const response = await axios({
      method: 'GET',
      baseURL: SERVER,
      url: '/get-stopped-machines',
      headers: { Authorization: localStorage.getItem('idToken') },
    });
    return response.data;
  } catch (err) {
    console.error('Error on get table data. \n', err);
  }
}
