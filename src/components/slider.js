import React from 'react';
import Styles from '../styles';

class Slider extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:this.props.value,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(ev){
    this.props.onChange(ev);
    this.setState({
      value:ev.target.value,
    })
  }

  render(){
    return(
      <div style={{
        width:'100%'
      }}>
        <input 
          type="range"
          min="1" max="30"
          value={this.state.value}  
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
export default Slider;