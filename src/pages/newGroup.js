import React from 'react';
import {Route, Link} from 'react-router-dom';
import Api from '../helpers/api';

const createObId = () => {
  return `${Math.random()}-${Math.random()}`;
};

export default //withRouter(({history}) => (
  class Group extends React.Component {
    onGroupCreate() {
      Api.get(`/api/createGroup/${createObId()}`).then(r => {
        window.location.assign(`/gr/${r.obId}`);
      });
    }

    render() {
      return (
        <div>
          <input
            type='button'
            value='Create group'
            onClick={this.onGroupCreate.bind(this)}
          />
        </div>
      );
    }
  };
//));
