import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'feed',
    path: '/',
    icon: <RssFeedOutlinedIcon />,
  },
  {
    title: 'Users',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Add repository',
    path: '/add-repository',
    icon: <CodeOutlinedIcon />,
  },
  {
    title: 'Repositories',
    path: '/repositories',
    icon: <SourceOutlinedIcon />,
  },
  {
    title: 'analytics',
    path: '/analytics',
    icon: icon('ic_analytics'),
  }
];

export default navConfig;
