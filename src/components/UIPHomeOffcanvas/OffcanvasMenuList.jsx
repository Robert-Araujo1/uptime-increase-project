import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import NearMeIcon from '@mui/icons-material/NearMe';
import BuildIcon from '@mui/icons-material/Build';
import { ReactComponent as POPSIcon } from '../../assets/icons/POPSIcon.svg';
import PowerBIIcon from '../../assets/icons/pbi.svg';
import i18next from '../../i18n/i18n';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();

  const items = [
    {
      href: '/home/dashboard',
      name: 'Dashboard Uptime',
      icon: <LeaderboardIcon />,
    },
    {
      href: '/home/machines',
      name: i18next.t('home.machines.pageTitle'),
      icon: <NearMeIcon />,
    },
    {
      href: '/home/workshop-management',
      name: 'Gestão de Máquinas Paradas',
      icon: <BuildIcon />,
    },
    {
      href: '/home/pops-connect',
      name: 'POPS Connect',
      icon: <POPSIcon fill='currentColor' style={{ width: 30, height: 30 }} />,
    },
    {
      href: 'https://app.powerbi.com/links/V2phNgENyb?ctid=76bddcdc-73b4-44d6-ba79-bb3f91ed8101&pbi_source=linkShare',
      name: 'BI Clientes Estratégicos',
      icon: <img width={15} height={15} src={PowerBIIcon} alt='Power BI' />,
    },
  ];
  return (
    <div className='menu-list d-flex align-items-start flex-column mb-3 w-100'>
      <ul
        className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100'
        id='menu'>
        {items.map((item, index) => {
          return (
            <>
              <NavItem
                key={index}
                {...item}
                isActive={location.pathname == item.href ? 'active' : ''}
              />
            </>
          );
        })}
      </ul>
    </div>
  );
};

const NavItem = ({ href, name, icon, isActive }) => {
  return (
    <li className='nav-item w-100 mb-4'>
      <a
        href={href}
        className={`nav-link ${isActive} align-middle`}
        target={name === 'BI Clientes Estratégicos' ? '_blank' : '_self'}>
        {icon}
        <span className='ms-1 d-sm-inline px-2'>{name}</span>
      </a>
    </li>
  );
};
