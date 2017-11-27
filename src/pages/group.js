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
      }
    }
  }

  componentDidMount() {
    this.req = window.__APP_INITIAL_STATE__;
    // Workaround because apparently express doesn't parse params right
    const obId = this.req.params[0].split('/')[1];
    Api.get(`/api/getGroup/${obId}`).then(result => {
      console.log("Got:", result);
      this.setState({groupData: result});
    });
  }

  render() {
    if (this.state.groupData.unloaded) {
      return <div>Loading</div>;
    }
    // All we have to do here is switch off of groupData.stage, and display the right pages
    const Page = groups[this.state.groupData.group.stage];
    return Page ?
      <Page groupData={this.state.groupData}/> :
      <div> Nonexistent group </div>;
  }
}

export default Group;
