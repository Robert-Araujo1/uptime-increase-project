import L from 'leaflet';

import unknown from '../../assets/images/machines/unknown.svg';
import attentiton from '../../assets/images/validation/attentiton.svg';
import completed from '../../assets/images/validation/completed.svg';
import inProgress from '../../assets/images/validation/inProgress.svg';
import getMachineCategoryIcon from '../../utils/getMachineCategoryIcon';

export default (machine) => {
  return L.icon({
    iconUrl:
      machine.MachineCategory == null
        ? unknown
        : getMachineCategoryIcon(machine.MachineCategory),
    shadowUrl: attentiton,

    iconSize: [32, 32],
    shadowSize: [24, 24],
    iconAnchor: [12, 31],
    shadowAnchor: [23, 43],
    popupAnchor: [-3, -76],
    className: 'uip-marker',
  });
};
