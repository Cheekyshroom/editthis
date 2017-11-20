import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class Sel extends React.Component {
  constructor() {
    super();
    this.Xpoints = [];
    this.Ypoints = [];
    this.mouseD = false;
  }
  componentDidMount(){
          const canvas = document.getElementById('myCanvas');
          const context = canvas.getContext('2d');
          
          canvas.onmousedown = (ev) => {
            
          }
          canvas.onmousemove = (ev) => {

          }
}

  render() {

    return (

      <div style={{
        width: '500',
        height: '500',
        border: '1px solid #000000',
        background: Styles.grey,
        display: 'block',
        justifyContent: 'center',
      }}>
        <canvas id="myCanvas" height={500} width = {500}/>
          THIS IS THE BOTTOM
      </div>
  
    );
  }
}

export default Sel;
