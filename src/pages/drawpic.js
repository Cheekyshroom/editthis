import React from 'react';
import {Link} from 'react-router-dom';
import Sheet from '../components/sheet';
import {SliderPicker} from 'react-color';

class DrawPic extends React.Component {
  render() {
    return (
      <div>
        You've Reached the Route!!!!!!!!!!!!!!!!!!!
        <Sheet imageURL = '/api/images/serve/testKor.jpg'/>
        <SliderPicker onChange={this.handleChange}/>
      </div>
    );
  }
}

export default DrawPic;
