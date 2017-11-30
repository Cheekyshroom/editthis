import Home from './pages/home';
import Group from './pages/group';
import NewGroup from './pages/newGroup';

import ApiRoutes from './api/routes';

export default [
  {
    component: Home,
    exact: true,
    path: '/'
  },
  {
    component: Group,
    path: '/gr/:oId'
  },
  {
    component: NewGroup,
    path: '/newGroup'
  },
  ...ApiRoutes
];
