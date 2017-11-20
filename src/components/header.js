import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class App extends React.Component {
  render() {
    return (
      <div style={{
        width: '100%',
        height: '5%',
        background: Styles.grey,
        display: 'flex',
        justifyContent: 'space-around',
      }}>
<<<<<<< HEAD
        <Link
          to='/upload'
          style={{}}
        >
          Upload
        </Link>
        <Link to='/users' style={{}}>Users</Link>
        <Link
          to='/storeupload'
          style={{}}
        >
          StoreUpload
        </Link>
          <Link to='/drawpic' style={{}}>DrawPic</Link>
          
          <Link to='/selectpage' style={{}}>SelectThis</Link>
=======
        <Link to='/upload' style={{}} > Upload </Link>
        <Link to='/newGroup' style={{}} > New Group </Link>  
        <Link to='/drawpic' style={{}} > DrawPic </Link>
>>>>>>> 240a9ce9079bd416014f8516ad92b840576ff52c
      </div>
    );
  }
}

export default App;
