import React from 'react';
import {Route, Link} from 'react-router-dom';
import Api from '../helpers/api';

const createObId = (length) => {
  let text = "";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for(let i = 0; i < length; i++){
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
};

export default //withRouter(({history}) => (
  class Group extends React.Component {
    onGroupCreate() {
      Api.get(`/api/createGroup/${createObId(5)}`).then(r => {
        window.location.assign(`/gr/${r.obId}`);
      });
    }

    render() {
      const buttonStyle = {
        height: 50,
        width: 300,
        backgroundColor:'#00BFFF',
        borderColor:'#00BFFF',
        alignSelf: 'center',
        justifyContent:'center',
        fontSize: '22px',
        color: 'white'
      };
      return(
        <body style = {{textAlign: 'center'}}>
        <div style = {{lineHeight:'450px'}}>
          <button style = {buttonStyle} onClick={this.onGroupCreate.bind(this)}>Create Group</button>
        </div>
        </body>
      );
    }
  };
//));
