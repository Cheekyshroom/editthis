import React from 'react';
import {Link} from 'react-router-dom';
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
        <Link to='/newGroup' style={{}} > New Group </Link>  
      </div>
    );
  }
}

export default App;
