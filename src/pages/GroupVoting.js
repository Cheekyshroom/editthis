import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

class GroupVoting extends React.Component {
  nextStage() {
    const group = this.props.groupData.group;
    console.log(`Incrementing stage from ${group.stage} to ${group.stage + 1}`);
    Api.get(`/api/updateStage/${group.obfuscatedId}/${group.stage + 1}`)
    .then(() => {
      Api.get(`/api/getWinningImage/${group.obfuscatedId}`)
      .then(image => {
        Api.get(`/api/setWinImage/${group.obfuscatedId}/${image.id}`).then(() => {
          window.location.assign(window.location.href);
        });
      });
    });
  }

  render() {
    const group = this.props.groupData.group;
    const currentTime = Math.floor(new Date().valueOf() / 1000);
    if (group.stage != 0 && group.stage != 3) {
      window.setTimeout(
        this.nextStage.bind(this),
        (group.nextStage - currentTime) * 1000
      );
    }
    return (
      <div>
        Group Voting Page
        <div>
          {this.props.groupData.images.map((image, i) => {
            return (
              <img
                src={`/api/images/serve/${image.imageId}`}
                key={`vote-${i}`}
                onClick={() => Api.get(`/api/images/vote/${image.imageId}`)}
                style={{cursor: 'pointer'}}
              />
            );
          })};
        </div>
      </div>
    );
  }
}

export default GroupVoting;
