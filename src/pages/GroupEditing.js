import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Sheet from '../components/sheet';
import {SliderPicker} from 'react-color';
import Styles from '../styles';

class GroupEditing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tool: 0,
      penColor: '#AAAAAA'
    };
    this.changeCursor = this.changeCursor.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.undo = this.undo.bind(this); 
  }

  changeCursor(cur, num) {
    document.body.style.cursor = cur;
    this.setState({tool: num});
  } 

  undo(){

  }
  
  onSliderChange(color) {
    this.setState({
      penColor: color.hex
    });
    console.log(color.hex);
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div id = "parent" style = {{display: 'flex', backgroundColor: 'DodgerBlue'}}>
          <div style = {{display: 'flex', flexDirection:'column'}}>
            <button style = {Styles.flexDiv} onClick = {() => this.changeCursor("pointer", 1)}>pen</button>
            <button style = {Styles.flexDiv} onClick = {() => this.changeCursor("crosshair", 2)}>fill</button>
            <button style = {Styles.flexDiv} onClick = {() => this.undo()}>undo</button>
            <button style = {Styles.flexDiv}>4</button>
            <button style = {Styles.flexDiv}>5</button>
            <button style = {Styles.flexDiv}>6</button>
            <button style = {Styles.flexDiv}>7</button>
            <button style = {Styles.flexDiv}>8</button>
          </div>

          Group Editing Page
          <Sheet
            imageURL={`/api/images/serve/${this.props.groupData.group.mainImage}`}
            color={this.state.penColor}
            toolNum={this.state.tool}
            groupData={this.props.groupData}
          />
        </div>
        <div>
          <SliderPicker
            color={this.state.penColor}
            onChange={this.onSliderChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default GroupEditing;
