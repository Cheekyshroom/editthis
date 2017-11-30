import React from 'react';
import {Link} from 'react-router-dom';
import Api from '../helpers/api';

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

class GroupVoting extends React.Component {
  newVotingAnimation(x, y) {
    const e = document.createElement('div');
    e.style.cssText = `width: 10px; height: 10px; background: red; position: absolute; left: ${x}px; top: ${y}px;`;
    document.getElementById('animateRoot').appendChild(e);
    let i = 50;
    const xv = randInt(-2, 2);
    const yv = randInt(-2, 2);
    const interval = window.setInterval(
      () => {
        x += xv;
        y += yv;
        e.style.cssText = `width: 10px; height: 10px; background: red; position: absolute; left: ${x}px; top: ${y}px;`;
        i--;
        if (i < 0) {
          window.clearInterval(interval);
          document.getElementById('animateRoot').removeChild(e);
        }
      },
      30
    );
  }

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
      <div id='animateRoot' style={{position: 'relative'}}>
        Group Voting Page
        <div style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
          {this.props.groupData.images.map((image, i) => {
            return (
              <img
                src={`/api/images/serve/${image.imageId}`}
                key={`vote-${i}`}
                onClick={(e) => {
                  Api.get(`/api/images/vote/${image.imageId}`).then(() => {
                    this.newVotingAnimation(randInt(0, window.innerWidth), randInt(0, window.innerWidth));
                  });
                }}
                style={{cursor: 'pointer', width: '33%'}}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupVoting;
