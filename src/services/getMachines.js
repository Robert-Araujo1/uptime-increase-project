import axios from 'axios';
import generateRandomMachines from '../assets/data/machines';

function createData(customer, machinePin, location, downtimeDays, insertDate) {
  return { customer, machinePin, location, downtimeDays, insertDate };
}

export default async function () {
  try {
    const response = await axios.get('http://127.0.0.1:5000/');
    return response.data;
  } catch (err) {
    console.error('Error on get table data. Generating fake data...\n', err);
    return generateRandomMachines().map((machine) =>
      createData(machine[0], machine[1], machine[2], machine[3], machine[4])
    );
  }
}
