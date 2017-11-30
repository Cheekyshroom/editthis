export default {
    penMouseDown: (myself, ev)=>{
    console.log("PENMOUSEDOWN           ");
    const mousePos = myself.getMousePos(myself.args.canvas, ev);
    const lineStart = {type: 'line',
                       points: [],
                       color: myself.props.color};
    lineStart.points.push(mousePos);
    myself.args.actions.push(lineStart);
    myself.args.actionNum = myself.args.actions.length - 1;
    myself.args.dragging = true;
    myself.draw(myself.args.context,myself.args.actions);
  }
}
