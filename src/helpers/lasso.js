export default {
    drawSingleLasso: (action, context, myself)=>{
      console.log("drawSingleLasso");
      let startX = action.points[0].x;
      let startY = action.points[0].y;
      myself.dot(startX, startY, context, action.color);
      context.lineWidth = myself.args.thickness;
      context.beginPath();
      context.moveTo(startX, startY);
      let pointNum = 1;
      context.strokeStyle = action.color;
      context.fillStyle = action.color;
      for (pointNum; pointNum<action.points.length; pointNum++){
        context.lineTo(
          action.points[pointNum].x, action.points[pointNum].y
        );
      }
      context.closePath();
      context.stroke();
      context.fill();
      myself.dot(action.points[pointNum-1].x, action.points[pointNum-1].y, context, action.color);     
  },
}

