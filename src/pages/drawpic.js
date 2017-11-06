import React from 'react';
import {Link} from 'react-router-dom';
import Sheet from '../components/sheet';

class DrawPic extends React.Component {
  render() {
    return (
      <div>
        You've Reached the Route!!!!!!!!!!!!!!!!!!!
        <Sheet imageURL = '/api/images/serve/testKor.jpg'/>
      </div>
    );
  }
}

export default DrawPic;
