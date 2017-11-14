import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class Sheet extends React.Component {
  constructor() {
    super();
    this.args = {lines:[],
                 dragging: false,
                 lineNum: 0,
                 thickns: 10
                }
    //index of last line
    this.lineNum = 0;
    this.canvas = null;
    this.context = null;
    //true when mouse is down
    this.dragging = false;
    this.image = null;
    this.width = 0;
    this.height = 0;
    this.natWidth = 0;
    this.natHeight = 0;
    this.cornerX = 0;
    this.cornerY = 0;
    this.thickns = 10;
  }
  componentDidMount(){
    this.args.canvas = document.getElementById('myCanvas');
    this.args.context = this.args.canvas.getContext('2d');
    this.args.image = new Image();
    this.args.image.src = this.props.imageURL;
    this.args.image.onload = () => {
      this.args.width = 500;
      this.args.height = 500;
      this.args.cornerX=0;
      this.args.cornerY=0;
      this.args.natWidth = this.args.image.naturalWidth;
      this.args.natHeight = this.args.image.naturalHeight;
      const aspRat = this.args.natWidth/this.args.natHeight;
      if(aspRat>1){
        this.args.width = 500;
        this.args.height = 500*(1/aspRat);  
        this.args.cornerY = (500-this.args.height)/2;
      }else{
        this.args.width = 500*(aspRat);
        this.args.height = 500;
        this.args.cornerX  = (500-this.args.width)/2;
      }

      this.args.context.drawImage(
        this.args.image,
        0,0,this.args.natWidth,this.args.natHeight,
        this.args.cornerX, this.args.cornerY,this.args.width, this.args.height
      );
    }
    console.log("mounted");
  }
  //returns mouse position relative to canvas
  getMousePos(canvas, ev){
    const rect = canvas.getBoundingClientRect();
      return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
      };
  }
  
  //when mouse held down starts line
  handleMouseDown(ev){
    const mousePos = this.getMousePos(this.args.canvas, ev);
    const lineStart = [];
    lineStart.push(mousePos);
    this.args.lines.push(lineStart);
    this.args.lineNum = this.args.lines.length - 1;
    this.args.dragging = true;
    this.draw();
    console.log(this.args.points + " startLine");
  }

  handleMouseMove(ev){
    if(this.args.dragging){
      const mousePos = this.getMousePos(this.args.canvas, ev);
      this.args.lines[this.args.lineNum].push(mousePos); 
      this.draw();
    } 
  }

  handleMouseUp(){
    this.args.dragging = false;
    console.log(this.args.lines);
  }

  point(x, y, canvas){
    canvas.beginPath();
    canvas.arc(x, y, 1, 0, 2 * Math.PI);
    canvas.fill();
  }
  //draws the image with lines
  draw(){
    this.args.context.drawImage(
        this.args.image,
        0,0,this.args.natWidth,this.args.natHeight,
        this.args.cornerX, this.args.cornerY,this.args.width,this.args.height
    );
    let line = 0;
    this.args.context.lineWidth = this.args.thickns;
    this.args.context.beginPath();
    //draw every line
    for(line; line<this.args.lines.length; line++){
      //start at first point in line
      let startX = this.args.lines[line][0].x;
      let startY = this.args.lines[line][0].y;
      this.point(startX, startY, this.args.context);
      this.args.context.moveTo(startX, startY);
      let point = 1;
      for (point; point<this.args.lines[line].length; point++){
      //line to every next point in line
        this.args.context.lineTo(
          this.args.lines[line][point].x, this.args.lines[line][point].y
        );
      }
      this.args.context.stroke();
    }
  }

  render() {

    return (
      <div style={{
        width: '100%',
        textAlign:'center',
        height: '500',
        border: '1px solid #000000',
        background: Styles.white,
        display: 'block',
        justifyContent: 'center',
      }}>
        <canvas 
          id="myCanvas" 
          height={500} 
          width={500} 
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseMove={this.handleMouseMove.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
          style={{
            display : 'block',
            margin: 'auto',
          }}/>
      </div>
    );
  }
}

export default Sheet;
