import React from 'react';
import Styles from '../styles';
import Api from '../helpers/api';

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
      loaded: false
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.loaded) {
      Api.post(
        '/api/images/upload',
        {image: this.state.image}
      ).then(r => {
        console.log('uploaded', r);
        if (this.props.onUpload) {
          this.props.onUpload(r);
        }
      });
    }
  }

  changeImage(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.addEventListener('load', () => {
      this.setState({
        image: reader.result,
        loaded: true
      });
    });

    reader.readAsBinaryString(file);
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit = {(e) => this.handleSubmit(e)}>
          <input className = "imgInput"
            type = "file" onChange = {(e) => this.changeImage(e)} />
          
          <button style = {Styles.buttonStyle}>Upload an image!</button>
        </form>
      </div>
    );
  }
}

export default Upload;
