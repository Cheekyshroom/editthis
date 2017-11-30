import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

import GroupStart from './GroupStart';
import GroupEditing from './GroupEditing';
import GroupVoting from './GroupVoting';
import GroupVictory from './GroupVictory';

import Timer from '../components/timer';

const groups = [
  GroupStart,
  GroupEditing,
  GroupVoting,
  GroupVictory
];

class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      groupData: {
        unloaded: true
      },
      timer: false
    }
  }

  componentDidMount() {
    this.req = window.__APP_INITIAL_STATE__;
    // Workaround because apparently express doesn't parse params right
    const obId = this.req.params[0].split('/')[1];
    Api.get(`/api/getGroup/${obId}`).then(result => {
      this.setState({groupData: result});
    });
  }

  render() {
    if (this.state.groupData.unloaded) {
      return <div>Loading</div>;
    }
    if (this.state.groupData.error) {
      return <div>Couldn't find the group you're looking for</div>;
    }
    const group = this.state.groupData.group;
    // Pick the page we want to display, and display it
    const Page = groups[group.stage];
    return Page ?
      <div style={{padding: '5px'}}>
        {(group.stage != 0 && group.stage != 3) && <Timer endTime={group.nextStage}/>}
        <Page
          groupData={this.state.groupData}
        />
      </div> :
      <div> Nonexistent group </div>;
  }
}

export default Group;
