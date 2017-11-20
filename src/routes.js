import Upload from './pages/upload';
import StoreUpload from './pages/storeupload';
import Home from './pages/home';
import DrawPic from './pages/drawpic';
import Selectpage from './pages/selectpage';
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
    component: DrawPic,
    path: '/drawpic'
  },
  { 
    component: Selectpage,
    path: '/selectpage'
  },
  ...ApiRoutes
];
