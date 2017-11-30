import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

class GroupVictory extends React.Component {
  render() {
    const group = this.props.groupData.group;
    return (
      <div>
        Group Victory Page
        <img src={`/api/images/serve/${group.winImage}`}/>
      </div>
    );
  }
}

export default GroupVictory;
