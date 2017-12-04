import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Sheet from '../components/sheet';
import Slider from '../components/slider'
import {SliderPicker} from 'react-color';
import Styles from '../styles';

class GroupEditing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tool: 0,
      penColor: '#AAAAAA',
      thickness:10,
    };
    this.changeCursor = this.changeCursor.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onthicknessChange = this.onthicknessChange.bind(this);
  }

  changeCursor(cur, num) {
    document.body.style.cursor = cur;
    this.setState({tool: num});
  } 

  onColorChange(color) {
    this.setState({
      penColor: color.hex
    });
  }

  onthicknessChange(thickness){
    this.setState({
      thickness:thickness.target.value,
    })
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div id = "parent" style = {{display: 'flex', backgroundColor: 'DodgerBlue'}}>
          <div style = {{display: 'flex', flexDirection:'column'}}>
            <button style = {Styles.flexDiv} onClick = {() => this.changeCursor("pointer", 1)}>pen</button>
            <button style = {Styles.flexDiv} onClick = {() => this.changeCursor("crosshair", 2)}>fill</button>
          </div>

          Group Editing Page
          <Sheet
            imageURL={`/api/images/serve/${this.props.groupData.group.mainImage}`}
            color={this.state.penColor}
            thickness={this.state.thickness}
            toolNum={this.state.tool}
            groupData={this.props.groupData}
          />
        </div>
        <div>
          <SliderPicker
            color={this.state.penColor}
            onChange={this.onColorChange}
          />
          <p>Thickness</p>
          <Slider 
            value={this.state.thickness}
            onChange={this.onthicknessChange}
          />
        </div>
      </div>
    );
  }
}

export default GroupEditing;
