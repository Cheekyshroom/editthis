import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Sheet from '../components/sheet';
import {SliderPicker} from 'react-color';

class GroupEditing extends React.Component {
  onSliderChange() {
    console.log("slider changed");
  }

  render() {
    return (
      <div>
        <img src={`/api/images/serve/${this.props.groupData.group.mainImage}`} width='100%'/>
        Group Editing Page
        <Sheet
          imageURL={`/api/images/serve/${this.props.groupData.group.mainImage}`}
        />
        <SliderPicker onChange={this.onSliderChange.bind(this)}/>
      </div>
    );
  }
}

export default GroupEditing;
