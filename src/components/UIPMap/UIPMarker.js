import L from 'leaflet';

import unknown from '../../assets/images/machines/unknown.svg';
import attentiton from '../../assets/images/validation/attentiton.svg';
import getMachineCategoryIcon from '../../utils/getMachineCategoryIcon';

export default (machine, flag = attentiton) => {
  return L.icon({
    iconUrl:
      machine.MachineCategory == null
        ? unknown
        : getMachineCategoryIcon(machine.MachineCategory),
    shadowUrl: flag == '' ? null : flag,

    iconSize: [32, 32],
    shadowSize: [24, 24],
    iconAnchor: [12, 31],
    shadowAnchor: [23, 43],
    popupAnchor: [-3, -76],
    className: 'uip-marker',
  });
};
