import excavator from '../assets/images/machines/excavator.svg';
import motorGrader from '../assets/images/machines/motor-grader.svg';
import loader from '../assets/images/machines/loader.svg';
import backhoe from '../assets/images/machines/backhoe.svg';
import crawlerDozer from '../assets/images/machines/crawler-dozer.svg';
import unknown from '../assets/images/machines/unknown.svg';

export default (category) => {
  switch (category.toUpperCase()) {
    case 'BACKHOES':
      return backhoe;
    case 'EXCAVATOR':
    case 'CRAWLER EXCAVATOR':
      return excavator;
    case 'TRACTOR':
    case 'CRAWLER':
    case 'CRAWLER DOZER':
      return crawlerDozer;
    case '4WD LOADERS':
    case '4WD LOADER':
      return loader;
    case 'MOTOR GRADERS':
    case 'MOTOR GRADER':
      return motorGrader;
    default:
      return unknown;
  }
};
