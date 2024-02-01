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
        'linear-gradient(150deg, rgba(148,218,185,1) 0%, rgba(25,135,84,1) 100%)';
      icon = (
        <AssignmentTurnedInIcon sx={{ color: '#ffffff' }} fontSize='medium' />
      );
      break;
    case 'in-progress':
      gradientBackground =
        'linear-gradient(150deg, rgba(171,202,246,1) 0%, rgba(13,110,253,1) 100%)';
      icon = <WatchLaterIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'not-started':
      gradientBackground =
        'linear-gradient(150deg, rgba(240,163,171,1) 0%, rgba(220,53,69,1) 100%)';
      icon = <AssignmentLateIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    case 'total':
      gradientBackground =
        'linear-gradient(150deg, rgba(246,222,148,1) 0%, rgba(255,193,7,1) 100%)';
      icon = <ConstructionIcon sx={{ color: '#ffffff' }} fontSize='medium' />;
      break;
    default:
      break;
  }

  return [gradientBackground, icon];
}

export default selectIconStyle;
