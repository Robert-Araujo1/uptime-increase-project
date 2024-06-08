import generateRandomMachines from '../assets/data/machines';
import { createData } from '../assets/data/machines';

export default function () {
  try {
    const response = generateRandomMachines().map((machine) =>
      createData(machine[0], machine[1], machine[2], machine[3], machine[4])
    );
    return response;
  } catch (err) {
    console.error('Error on get table data. Generating fake data...\n', err);
  }
}
