export default {
  penMouseDown: (myself, ev)=>{
    if(myself.args.latestActionNum!=-1){
      myself.args.actions = myself.args.actions.slice(0,myself.args.latestActionNum); 
    }
    for(let i =0;i<myself.args.actions.length;i++){
      console.log(myself.args.actions[i]);
    }
    //console.log("got to penMouseDown");
    const mousePos = myself.getMousePos(myself.args.canvas, ev);
    myself.args.lastX = mousePos.x;
    myself.args.lastY = mousePos.y;
    const lineStart = {type: 'line',
                       points: [],
                       color: myself.props.color};
    lineStart.points.push(mousePos);
    myself.args.actions.push(lineStart);
    myself.args.latestActionNum++;
    myself.args.dragging = true;
    myself.dot(mousePos.x, mousePos.y, myself.args.context, lineStart.color);
    //console.log("myself   "+myself);
  },

  drawSingleLine: (points, color, context, myself)=>{
    let startX = points[0].x;
    let startY = points[0].y;
    myself.dot(startX, startY, context, color);
    context.lineWidth = myself.args.thickns;
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
    myself.dot(points[pointNum-1].x, points[pointNum-1].y, context, color);
   
  },

  penMouseMove: (myself, args, ev)=>{
    if(args.dragging){
      const mousePos = myself.getMousePos(args.canvas, ev);
      args.context.beginPath();
      args.context.moveTo(args.lastX, args.lastY);
      //console.log(args);
      //console.log("points     "+args.actions[args.actions.length-1].points);
      args.context.lineTo(mousePos.x, mousePos.y)
      args.context.strokeStyle = args.actions[args.actions.length-1].color;
      args.context.lineWidth = args.thickns;
      args.context.stroke();
      args.actions[args.actions.length-1].points.push(mousePos); 
      args.lastX = mousePos.x;
      args.lastY = mousePos.y;
    }
  }
}
