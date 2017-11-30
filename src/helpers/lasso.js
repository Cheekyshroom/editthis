export default {
    lassoMouseDown: (myself, ev)=>{
    const mousePos = myself.getMousePos(myself.args.canvas, ev);
    const lassoStart = {type: 'lasso',
                       points: [],
                       color: myself.props.color};
    lassoStart.points.push(mousePos);
    myself.args.actions.push(lassoStart);
    myself.args.latestActionNum++;
    myself.args.dragging = true;
    myself.draw(myself.args.context,myself.args.actions);
  },

    drawSingleLasso: (points, color, context, myself)=>{
      console.log("drawSingleLasso");
      //console.log(points);
      //console.log(color);
      let startX = points[0].x;
      let startY = points[0].y;
      myself.dot(startX, startY, context, color);
      context.lineWidth = myself.args.thickns;
      context.beginPath();
      context.moveTo(startX, startY);
      let pointNum = 1;
      context.strokeStyle = color;
      context.fillStyle = color;
      for (pointNum; pointNum<points.length; pointNum++){
      //line to every next pointNum in line
        context.lineTo(
          points[pointNum].x, points[pointNum].y
        );
      }
      context.closePath();
      context.stroke();
      context.fill();
      myself.dot(points[pointNum-1].x, points[pointNum-1].y, context, color);     
  },

  lassoMouseMove: (myself, ev)=>{
    if(myself.args.dragging){
      const mousePos = myself.getMousePos(myself.args.canvas, ev);
      myself.args.actions[myself.args.actions.length-1].points.push(mousePos); 
      myself.draw(myself.args.context,myself.args.actions);
    }
  }
}
