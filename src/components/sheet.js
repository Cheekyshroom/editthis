import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class Sheet extends React.Component {
  componentDidMount(){
          var blank = document.getElementById('myCanvas');
          var context = blank.getContext('2d');
          var base_image = new Image();
          base_image.src = '/api/images/serve/test.jpg';
          base_image.onload = () => {
            var width = base_image.naturalWidth;
            var height = base_image.naturalHeight;
            var aspRat = height/width;
            var w = 500;
            var h = 500*aspRat;

            // blank.width = base_image.naturalWidth/10;
            // blank.height = base_image.naturalHeight/10;
            // console.log(blank.width+" width" );
            // console.log(blank.height+" height");
            context.drawImage(base_image,0,0,w,h);
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
