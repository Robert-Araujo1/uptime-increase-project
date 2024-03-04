import {
  getRandomCity,
  generateRandomPinMachine,
  getRandomValue,
  generateRandomDate,
} from '../utils/dataManipulation';
import i18next from '../../../i18n/i18n';

export default function generateRandomMachines() {
  var machines = [];

  for (let index = 1; index < 26; index++) {
    machines.push([
      i18next.t('home.dashboard.customer') + ' ' + index,
      generateRandomPinMachine(),
      getRandomCity(),
      getRandomValue(5, 10),
      generateRandomDate(),
    ]);
  }

  return machines;
}
