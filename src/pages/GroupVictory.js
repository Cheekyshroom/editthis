import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

class GroupVictory extends React.Component {
  render() {
    const group = this.props.groupData.group;
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          This is the winning picture!
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img src={`/api/images/serve/${group.winImage}`}/>
        </div>
      </div>
    );
  }
}

export default GroupVictory;
