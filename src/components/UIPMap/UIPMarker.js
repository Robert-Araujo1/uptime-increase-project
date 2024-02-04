import L from 'leaflet';
import excavator from '../../assets/images/machines/excavator.svg';
import motorGrader from '../../assets/images/machines/motor-grader.svg';
import loader from '../../assets/images/machines/loader.svg';
import backhoe from '../../assets/images/machines/backhoe.svg';
import crawlerDozer from '../../assets/images/machines/crawler-dozer.svg';
import attentiton from '../../assets/images/validation/attentiton.svg';
import completed from '../../assets/images/validation/completed.svg';
import inProgress from '../../assets/images/validation/inProgress.svg';

import { getRandomByValues } from '../../assets/data/utils/dataManipulation';

const models = [excavator, motorGrader, loader, backhoe, crawlerDozer];
const validations = [completed, attentiton, inProgress];

export default () =>
  L.icon({
    iconUrl: getRandomByValues(models),
    shadowUrl: getRandomByValues(validations),

    iconSize: [32, 32],
    shadowSize: [24, 24],
    iconAnchor: [12, 31],
    shadowAnchor: [23, 43],
    popupAnchor: [-3, -76],
    className: 'uip-marker',
  });
