import excavator from '../assets/images/machines/excavator.svg';
import motorGrader from '../assets/images/machines/motor-grader.svg';
import loader from '../assets/images/machines/loader.svg';
import backhoe from '../assets/images/machines/backhoe.svg';
import crawlerDozer from '../assets/images/machines/crawler-dozer.svg';
export default (category) => {
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
