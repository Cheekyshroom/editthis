import React from 'react';
import {Link} from 'react-router-dom';
import Styles from '../styles';
import tools from '../helpers/pen';

class Sheet extends React.Component {
  constructor() {
    super();
    this.args = {actions:[],
                 dragging: false,
                 lineNum: 0,
                 thickns: 10,
                 natWidth:0,
                 natHeight:0,
                 width:0,
                 height:0,
                 cornerX:0,
                 cornerY:0,
                 context:null,
                 canvas:null,
                 image:null,
                }
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
      this.drawBase(this.args.context);
    }
    console.log("mounted");
  }

  shouldComponenetUpdate(){
    return false;
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
    console.log(tools);
    tools.penMouseDown(this, ev);
  }

  // penMouseDown(ev){
  //   const mousePos = this.getMousePos(this.args.canvas, ev);
  //   const lineStart = {type: 'line',
  //                      points: [],
  //                      color: this.props.color};
  //   lineStart.points.push(mousePos);
  //   this.args.actions.push(lineStart);
  //   this.args.lineNum = this.args.actions.length - 1;
  //   this.args.dragging = true;
  //   this.draw(this.args.context,this.args.actions);
  // }

  handleMouseMove(ev){
     this.penMouseMove(ev);
  }

  penMouseMove(ev){
    if(this.args.dragging){
      const mousePos = this.getMousePos(this.args.canvas, ev);
      this.args.actions[this.args.lineNum].points.push(mousePos); 
      this.draw(this.args.context,this.args.actions);
    }
  }

  handleMouseUp(){
    this.args.dragging = false;
  }

  dot(x, y, context, color){
    console.log("dot");
    console.log("color   " + color);
    context.beginPath();
    context.arc(x, y, this.args.thickns/2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }

  drawBase(context){
     context.drawImage(
        this.args.image,
        0,0,this.args.natWidth,this.args.natHeight,
        this.args.cornerX, this.args.cornerY,this.args.width,this.args.height
    );
  }
//DELETE IF NEVER USED
  drawLines(context,actions){
    let lineNum = 0;
    context.lineWidth = this.args.thickns;
    //draw every line
    for(lineNum; lineNum<actions.length; lineNum++){
      //start at first point in line
      let startX = actions[lineNum].points[0].x;
      let startY = actions[lineNum].points[0].y;
      this.dot(startX, startY, context, actions[lineNum].color);
      context.beginPath();
      context.moveTo(startX, startY);
      let pointNum = 1;
      context.strokeStyle = actions[lineNum].color;
      for (pointNum; pointNum<actions[lineNum].points.length; pointNum++){
      //line to every next pointNum in line
        context.lineTo(
          actions[lineNum].points[pointNum].x, actions[lineNum].points[pointNum].y
        );
      }
      //this.dot(actions[lineNum].points[pointNum-1].x, actions[lineNum].points[pointNum-1].y, context, actions[lineNum].color);
      context.stroke();
    }
  }

  drawSingleLine(points, color, context,){
      console.log("drawSingleLine");
      console.log(points);
      console.log(color);
      let startX = points[0].x;
      let startY = points[0].y;
      this.dot(startX, startY, context, color);
      context.lineWidth = this.args.thickns;
      context.beginPath();
      context.moveTo(startX, startY);
      let pointNum = 1;
      context.strokeStyle = color;
      for (pointNum; pointNum<points.length; pointNum++){
      //line to every next pointNum in line
        context.lineTo(
          points[pointNum].x, points[pointNum].y
        );
      }
      context.stroke();
      this.dot(points[pointNum-1].x, points[pointNum-1].y, context, color);
     
  }
  

  //draws the image with lines
  draw(context, actions){
    console.log("main draw function");
    this.drawBase(context);
    let actionNum = 0;
    for(actionNum; actionNum<actions.length; actionNum++){
      if(actions[actionNum].type == 'line'){
        this.drawSingleLine(actions[actionNum].points, actions[actionNum].color, context);
      }
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
