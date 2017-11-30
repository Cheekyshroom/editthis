import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';
import Upload from '../components/upload';

class GroupStart extends React.Component {
  onImageUpload(image) {
    const group = this.props.groupData.group;
    Api.get(`/api/setMainImage/${group.obfuscatedId}/${image.id}`)
    .then(() => {
      Api.get(`/api/updateStage/${group.obfuscatedId}/${group.stage + 1}`)
      .then(() => {
        window.location.assign(window.location.href);
      });
    });
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          You just created a new group! Share this link with friends to get started :)
        </div>
        <div style={{padding: '10px 30px'}}>
          <div style={{padding: '10px', textAlign: 'center'}}>
            {window.location.href}
          </div>
          <Upload onUpload={this.onImageUpload.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default GroupStart;
