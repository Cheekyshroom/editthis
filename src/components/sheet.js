import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class Sheet extends React.Component {
  constructor() {
    super();
    this.Xpoints = [];
    this.Ypoints = [];
    this.mouseD = false;
  }
  componentDidMount(){
          const canvas = document.getElementById('myCanvas');
          const context = canvas.getContext('2d');
          const base_image = new Image();
          base_image.src = this.props.imageURL;
          base_image.onload = () => {
            let width = 500;
            let height = 500;
            const aspRat = base_image.naturalWidth/base_image.naturalHeight;
            if(aspRat>1){
              width = 500;
              height = 500*(1/aspRat);  
            }else{
              width = 500*(aspRat);
              height = 500
            }
            context.drawImage(base_image,0,0,base_image.naturalWidth,base_image.naturalHeight,0,0,width,height);
          }
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
        background: Styles.white,
        display: 'block',
        justifyContent: 'center',
      }}>
        <canvas id="myCanvas" height={500} width = {500}/>
      </div>
    );
  }
}

export default Sheet;
