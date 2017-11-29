import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Upload from '../components/upload';

class GroupStart extends React.Component {
  onImageUpload(image) {
    const group = this.props.groupData.group;
    console.log(`Incrementing stage from ${group.stage} to ${group.stage + 1}`);
    Api.get(`/api/updateStage/${group.obfuscatedId}/${group.stage + 1}`)
    .then(() => {
      window.location.assign(window.location.href);
    });
  }

  render() {
    console.log("Data is", this.props.groupData);
    return (
      <div>
        You just created a new group! Share this link with friends to get started :)
        <div>
          {window.location.href}
        </div>
        <Upload onUpload={this.onImageUpload.bind(this)}/>
      </div>
    );
  }
}

export default GroupStart;
