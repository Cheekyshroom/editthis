import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

import GroupStart from './GroupStart';
import GroupEditing from './GroupEditing';
import GroupVoting from './GroupVoting';
import GroupVictory from './GroupVictory';

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

  nextStage() {
    const group = this.state.groupData.group;
    console.log(`Incrementing stage from ${group.stage} to ${group.stage + 1}`);
    Api.get(`/api/updateStage/${group.obfuscatedId}/${group.stage + 1}`)
    .then(() => {
      window.location.assign(window.location.href);
    });
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
    if (!this.state.timer && group.stage != 0 && group.stage != 3) {
      const currentTime = Math.floor(new Date().valueOf() / 1000);
      window.setTimeout(
        this.nextStage.bind(this),
        (group.nextStage - currentTime) * 1000
      );
    }
    // Pick the page we want to display, and uh, display it :)
    const Page = groups[group.stage];
    return Page ?
      <Page groupData={this.state.groupData}/> :
      <div> Nonexistent group </div>;
  }
}

export default Group;
