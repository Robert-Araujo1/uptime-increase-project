import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ConstructionIcon from '@mui/icons-material/Construction';

function selectIconStyle(iconStyle) {
  let gradientBackground;
  let icon;

  switch (iconStyle) {
    case 'started':
      gradientBackground =
        'linear-gradient(195deg, rgba(24,161,66,1) 0%, rgba(8,115,7,1) 100%)';
      icon = (
        <AssignmentTurnedInIcon sx={{ color: '#ffffff' }} fontSize='medium' />
      );
      break;
    case 'in-progress':
      gradientBackground =
        'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))';
      icon = <WatchLaterIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'not-started':
      gradientBackground =
        'linear-gradient(150deg, rgba(240,163,171,1) 0%, rgba(220,53,69,1) 100%)';
      icon = <AssignmentLateIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'total':
      gradientBackground =
        'linear-gradient(195deg, rgba(250,180,45,1) 0%, rgba(235,159,22,1) 100%)';
      icon = <ConstructionIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    default:
      break;
  }

  return [gradientBackground, icon];
}

export default selectIconStyle;
