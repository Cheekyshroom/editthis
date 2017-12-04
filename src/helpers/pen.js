export default {
  penMouseDown: (myself, ev)=>{
    console.log("latestActionNum   "+myself.latestActionNum);
    if(myself.args.latestActionNum>-1){
      myself.args.actions = myself.args.actions.slice(0,myself.args.latestActionNum+1); 
    }else{
      myself.args.actions=[];
    }
    for(let i =0;i<myself.args.actions.length;i++){
      console.log(myself.args.actions[i]);
    }
    //console.log("got to penMouseDown");
    const mousePos = myself.getMousePos(myself.args.canvas, ev);
    myself.args.lastX = mousePos.x;
    myself.args.lastY = mousePos.y;
    const lineStart = {
                        type: 'line',
                        points: [],
                        color: myself.props.color,
                        thickness: myself.props.thickness,
                      };
    if(myself.props.toolNum==2){
      lineStart.type='lasso';
    }
    lineStart.points.push(mousePos);
    myself.args.actions.push(lineStart);
    myself.args.latestActionNum++;
    myself.args.dragging = true;
    myself.dot(mousePos.x, mousePos.y, myself.args.context, lineStart.color, lineStart.thickness);
    //console.log("myself   "+myself);
  },

  drawSingleLine: (action, context, myself)=>{
    let startX = action.points[0].x;
    let startY = action.points[0].y;
    myself.dot(startX, startY, context, action.color, action.thickness);
    context.lineWidth = action.thickness;
    context.beginPath();
    context.moveTo(startX, startY);
    let pointNum = 1;
    context.strokeStyle = action.color;
    for (pointNum; pointNum<action.points.length; pointNum++){
    //line to every next pointNum in line
      context.lineTo(
        action.points[pointNum].x, action.points[pointNum].y
      );
    }
    context.stroke();
    myself.dot(action.points[pointNum-1].x, 
               action.points[pointNum-1].y,
               context, action.color,action.thickness);
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
      args.context.lineWidth = myself.props.thickness;
      args.context.stroke();
      args.actions[args.actions.length-1].points.push(mousePos); 
      args.lastX = mousePos.x;
      args.lastY = mousePos.y;
    }
  }
}
