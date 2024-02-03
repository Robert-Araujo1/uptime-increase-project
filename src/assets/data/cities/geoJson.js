import { getRandomValue } from '../utils/dataManipulation';
function getRandomCoordinates(minLat, maxLat, minLong, maxLong) {
  var coordinates = [];
  for (var i = 0; i < getRandomValue(1, 5); i++) {
    var lat = (Math.random() * (maxLat - minLat) + minLat).toFixed(4);
    var long = (Math.random() * (maxLong - minLong) + minLong).toFixed(4);

    coordinates.push([parseFloat(lat), parseFloat(long)]);
  }
  return coordinates;
}

export const geoCoordinates = {
  Recife: getRandomCoordinates(-8.1, -7.9, -35.0, -34.8),
  Salvador: getRandomCoordinates(-13.02, -12.8, -38.55, -38.3),
  Aracaju: getRandomCoordinates(-10.98, -10.9, -37.13, -37.04),
  Natal: getRandomCoordinates(-6.34, -5.74, -35.22, -35.15),
  JoaoPessoa: getRandomCoordinates(-7.2, -7.06, -34.9, -34.78),
  Fortaleza: getRandomCoordinates(-3.92, -3.72, -38.62, -38.44),
  Teresina: getRandomCoordinates(-5.2, -5.02, -42.84, -42.7),
  Petrolina: getRandomCoordinates(-9.43, -9.35, -40.53, -40.45),
};
