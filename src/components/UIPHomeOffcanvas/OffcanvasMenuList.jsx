import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();

  const items = [
    { href: '/home/dashboard', name: 'Dashboard', icon: <LeaderboardIcon /> },
    { href: '#', name: 'Option 2', icon: <NotificationsIcon /> },
    { href: '#', name: 'Option 3', icon: <NearMeIcon /> },
  ];
  return (
    <div className='menu-list d-flex align-items-start flex-column mb-3 w-100'>
      <ul
        className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100'
        id='menu'>
        {items.map((item, index) => {
          return (
            <NavItem
              key={index}
              {...item}
              isActive={location.pathname == item.href ? 'active' : ''}
            />
          );
        })}
      </ul>
    </div>
  );
};

const NavItem = ({ href, name, icon, isActive }) => {
  return (
    <li className='nav-item w-100 mb-4'>
      <a href={href} className={`nav-link ${isActive} align-middle`}>
        {icon}
        <span className='ms-1 d-sm-inline px-2'>{name}</span>
      </a>
    </li>
  );
};
