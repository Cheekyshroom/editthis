import React from 'react';
import Styles from '../styles';
import Api from '../helpers/api';

class Timer extends React.Component {
  constructor(props) {
    super();
    const currentTime = Math.floor(new Date().valueOf() / 1000);
    const secondsLeft = props.endTime - currentTime;

    this.state = {secondsLeft};
  }

  componentDidMount() {
    window.setInterval(
      () => {
        const currentTime = Math.floor(new Date().valueOf() / 1000);
        const secondsLeft = this.props.endTime - currentTime;
        this.setState({secondsLeft});
      }, 1000
    );
  }

  render() {
    return (
      <div>
        {this.state.secondsLeft >= 0 ? this.state.secondsLeft : 0} seconds till next round
      </div>
    );
  }
}

export default Timer;
