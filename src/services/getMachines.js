import axios from 'axios';

export default async function () {
  try {
    const response = await axios.get(
      'http://127.0.0.1:5000/getStoppedMachines'
    );
    return response.data;
  } catch (err) {
    console.error('Error on get table data. Generating fake data...\n', err);
  }
}
