import React from 'react';
import {Link} from 'react-router-dom';
import Styles from '../styles';
import Api from '../helpers/api';
import pen from '../helpers/pen';
import lasso from '../helpers/lasso';

class Sheet extends React.Component {
  constructor() {
    super();
    this.args = {actions:[],
                 redoActions:[],
                 dragging: false,
                 latestActionNum: null,
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
                 lastX:0,
                 lastY:0,
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
      this.drawBase(this.args);
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
    console.log("toolnum   "+this.props.toolNum);
    if(this.props.toolNum!=0){
      pen.penMouseDown(this, ev);
    }
  }

  handleMouseMove(ev){
    //console.log("pen mouse move");
    pen.penMouseMove(this ,this.args, ev);
  }

  handleMouseUp(){
    this.args.dragging = false;
    if(this.props.toolNum == 2){
      this.args.actions[this.args.actions.length-1].type = 'lasso';
      this.draw(this.args.context, this.args.actions);
    }
  }

  dot(x, y, context, color){
    //console.log("dot");
    //console.log("color   " + color);
    context.beginPath();
    context.arc(x, y, this.args.thickns/2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }

  drawBase(args){
     args.context.drawImage(
        args.image,
        0,0,args.natWidth,args.natHeight,
        args.cornerX, args.cornerY,args.width,args.height
    );
  }

  //draws the image with lines
  draw(context, actions){
    console.log("main draw function");
    for(let i =0;i<actions.length;i++){
      console.log(actions[i]);
    }
    this.drawBase(this.args);
    if(this.args.latestActionNum!=null){
            let actionNum = 0;
      for(actionNum; actionNum<this.args.latestActionNum; actionNum++){
        if(actions[actionNum].type == 'line'){
          pen.drawSingleLine(actions[actionNum].points, actions[actionNum].color, context, this);
        }
        else if(actions[actionNum].type == 'lasso'){
          lasso.drawSingleLasso(actions[actionNum].points, actions[actionNum].color, context, this);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  undo(){
    if(this.args.latestActionNum>0){
      this.args.latestActionNum--;
    }else{
      this.args.latestActionNum = null;
    }
    this.draw(this.args.context, this.args.actions);
  }


  nextStage() {
    this.args.canvas.toBlob(blob => {
      const reader = new FileReader();
      reader.onload = () => {
        Api.post(
          '/api/images/upload',
          {image: reader.result}
        ).then(r => {
          const group = this.props.groupData.group;
          Api.get(`/api/addImage/${group.obfuscatedId}/${r.id}`)
          .then(() => {
            console.log(`Incrementing stage from ${group.stage} to ${group.stage + 1}`);
            Api.get(`/api/updateStage/${group.obfuscatedId}/${group.stage + 1}`)
            .then(() => {
              window.setTimeout(() => window.location.assign(window.location.href), 2000);
            });
          });
        });
      };
      reader.readAsBinaryString(blob);
    }, 'image/jpeg', 1);
  }

  render() {
    const group = this.props.groupData.group;
    const currentTime = Math.floor(new Date().valueOf() / 1000);
    if (group.stage != 0 && group.stage != 3) {
      window.setTimeout(
        this.nextStage.bind(this),
        (group.nextStage - currentTime) * 1000
      );
    }

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
          <button  
            onClick={this.undo.bind(this)}
          >undo</button>
      </div>
    );
  }
}

export default Sheet;
