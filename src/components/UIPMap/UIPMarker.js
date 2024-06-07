import L from 'leaflet';
import excavator from '../../assets/images/machines/excavator.svg';
import motorGrader from '../../assets/images/machines/motor-grader.svg';
import loader from '../../assets/images/machines/loader.svg';
import backhoe from '../../assets/images/machines/backhoe.svg';
import crawlerDozer from '../../assets/images/machines/crawler-dozer.svg';
import unknown from '../../assets/images/machines/unknown.svg';
import attentiton from '../../assets/images/validation/attentiton.svg';
import completed from '../../assets/images/validation/completed.svg';
import inProgress from '../../assets/images/validation/inProgress.svg';

export default (machine) => {
  return L.icon({
    iconUrl:
      machine.category == null ? unknown : getCategoryIcon(machine.category),
    shadowUrl: attentiton,

    iconSize: [32, 32],
    shadowSize: [24, 24],
    iconAnchor: [12, 31],
    shadowAnchor: [23, 43],
    popupAnchor: [-3, -76],
    className: 'uip-marker',
  });
};

const getCategoryIcon = (category) => {
  switch (category.toUpperCase()) {
    case 'BACKHOES':
      return backhoe;
    case 'EXCAVATOR':
      return excavator;
    case 'TRACTOR':
    case 'CRAWLER':
      return crawlerDozer;
    case '4WD LOADERS':
      return loader;
    case 'MOTOR GRADERS':
      return motorGrader;
    default:
      return unknown;
  }
};
