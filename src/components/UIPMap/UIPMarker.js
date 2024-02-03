import L from 'leaflet';
import excavator from '../../assets/images/machines/excavator.svg';
import motorGrader from '../../assets/images/machines/motor-grader.svg';
import loader from '../../assets/images/machines/loader.svg';
import backhoe from '../../assets/images/machines/backhoe.svg';
import crawlerDozer from '../../assets/images/machines/crawler-dozer.svg';
import { getRandomByValues } from '../../assets/data/utils/dataManipulation';

const models = [excavator, motorGrader, loader, backhoe, crawlerDozer];

export default () =>
  L.icon({
    iconUrl: getRandomByValues(models),
    iconSize: [32, 32],
    shadowSize: [50, 64],
    iconAnchor: [12, 31],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
    className: 'uip-marker',
  });
