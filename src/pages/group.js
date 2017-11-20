import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

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
    // All we have to do here is switch off of groupData.state, and display the right pages
    return (
      <div>
        Loaded!
      </div>
    );
  }
}

export default Group;
