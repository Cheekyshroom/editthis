import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Sheet from '../components/sheet';
import {SliderPicker} from 'react-color';

class GroupEditing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tool: 0,
      penColor: '#AAAAAA'
    }; 
  }

  changeCursor(cur, num) {
      console.log(this);
      document.body.style.cursor = cur;
      this.setState({tool: num}, () => {console.log(this.state.tool);
      });
  }   
  onSliderChange(color) {
    this.setState({
      penColor: color.hex
    });
  }

  render() {

    const containerStyle = {
      width: '30%',
      'flex-direction': 'row',
      'flex-wrap': 'wrap',
      backgroundColor: 'DodgerBlue'
    };

    const flexDiv = {
      backgroundColor: '#f1f1f1',
      width: '40px',
      height: '40px',
      padding: '10px',
      margin: '10px',
      textAlign: 'center',
      lineHeight: '20px',
      fontSize: '20px'
    };
    
    return (
      <div id = "parent" style = {{display: 'flex', backgroundColor: 'DodgerBlue'}}>
        <div style = {{display: 'flex', flexDirection:'column'}}>
            <button style = {flexDiv} onClick = {() => this.changeCursor("pointer", 1)}>pen</button>
            <button style = {flexDiv} onClick = {() => this.changeCursor("crosshair", 2)}>fill</button>
            <button style = {flexDiv}>3</button>
            <button style = {flexDiv}>4</button>
            <button style = {flexDiv}>5</button>
            <button style = {flexDiv}>6</button>
            <button style = {flexDiv}>7</button>
            <button style = {flexDiv}>8</button>
        </div>

          <div>
            <Sheet
                imageURL={`/api/images/serve/${this.props.groupData.group.mainImage}`}
            />
            <SliderPicker 
              onChange={this.onSliderChange.bind(this)}
            />
          </div>
      </div>
    );
  }
}

export default GroupEditing;
