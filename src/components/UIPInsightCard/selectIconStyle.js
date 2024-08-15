import ApartmentIcon from '@mui/icons-material/Apartment';
import ConstructionIcon from '@mui/icons-material/Construction';

function selectIconStyle(iconStyle) {
  let gradientBackground;
  let icon;

  switch (iconStyle) {
    case 'R1':
      gradientBackground =
        'linear-gradient(195deg, rgba(103, 16, 242, 1) 0%, rgba(82, 2, 209,1) 100%)';
      icon = <ApartmentIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'R2':
      gradientBackground =
        'linear-gradient(195deg, rgb(253, 125, 20), rgb(212, 99, 6))';
      icon = <ApartmentIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'R3':
      gradientBackground =
        'linear-gradient(150deg, rgba(28, 252, 226, 1) 0%, rgba(6, 207, 183, 1) 100%)';
      icon = <ApartmentIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'total':
      gradientBackground =
        'linear-gradient(195deg, rgba(24,161,66,1) 0%, rgba(8,115,7,1) 100%)';
      icon = <ConstructionIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    default:
      break;
  }

  return [gradientBackground, icon];
}

export default selectIconStyle;
