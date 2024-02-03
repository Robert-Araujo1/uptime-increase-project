export function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomByValues(values) {
  var ind = Math.floor(Math.random() * values.length);
  return values[ind];
}

export function getRandomPrefix() {
  const prefix = ['1BZ524K', '1BZ310P', '1F9210G', '1BZ750J', '1BZ670G'];
  return getRandomByValues(prefix);
}

export function getRandomCity() {
  const cities = [
    'Recife - PE',
    'Salvador - BA',
    'Aracaju - PE',
    'Natal - RN',
    'João Pessoa - PB',
    'Fortaleza - CE',
    'Teresina - PI',
    'Petrolina - PE',
  ];

  return getRandomByValues(cities);
}

export function midPinMachine() {
  function randomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return getRandomByValues(alphabet);
  }

  var group = '';
  for (var i = 0; i < 4; i++) {
    group += randomLetter();
  }
  return group;
}

export function generateRandomPinMachine() {
  var sufix = getRandomValue(1, 999999).toString().padStart(6, '0');
  return `${getRandomPrefix() + midPinMachine() + sufix}`;
}
