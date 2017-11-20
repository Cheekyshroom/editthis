import Upload from './pages/upload';
import StoreUpload from './pages/storeupload';
import Home from './pages/home';
import DrawPic from './pages/drawpic';
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
    component: Upload,
    path: '/upload'
  },
  {
    component: StoreUpload,
    path: '/storeupload'
  },
  {
    component: Group,
    path: '/gr/:oId'
  },
  {
    component: NewGroup,
    path: '/newGroup'
  },
  {
    component: DrawPic,
    path: '/drawpic'
  },
  ...ApiRoutes
];
