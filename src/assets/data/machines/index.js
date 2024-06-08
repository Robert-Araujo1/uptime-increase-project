import {
  generateRandomPinMachine,
  getRandomValue,
  generateRandomDate,
} from '../utils/dataManipulation';
import i18next from '../../../i18n/i18n';

export function createData(
  customer,
  machinePin,
  engineHours,
  downtimeDays,
  insertDate
) {
  return { customer, machinePin, engineHours, downtimeDays, insertDate };
}

export default function generateRandomMachines() {
  var machines = [];

  for (let index = 1; index < 26; index++) {
    machines.push([
      i18next.t('home.dashboard.customer') + ' ' + index,
      generateRandomPinMachine(),
      getRandomValue(1, 8000),
      generateRandomDate(),
    ]);
  }

  return machines;
}
