import Upload from './pages/upload';
import StoreUpload from './pages/storeupload';
import Home from './pages/home';
import DrawPic from './pages/drawpic';
import Selectpage from './pages/selectpage';
<<<<<<< HEAD

=======
import Group from './pages/group';
import NewGroup from './pages/newGroup';

>>>>>>> 240a9ce9079bd416014f8516ad92b840576ff52c
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
<<<<<<< HEAD
=======
    component: Group,
    path: '/gr/:oId'
  },
  {
    component: NewGroup,
    path: '/newGroup'
  },
  {
>>>>>>> 240a9ce9079bd416014f8516ad92b840576ff52c
    component: DrawPic,
    path: '/drawpic'
  },
  { 
    component: Selectpage,
    path: '/selectpage'
  },
  ...ApiRoutes
];
