import React from 'react';
import Styles from '../styles';
import Api from '../helpers/api';

class Upload extends React.Component {
  constructor(props) {
    super(props);
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

    reader.readAsDataURL(file);
  }

  render() {
    console.log('props', window.__APP_INITIAL_STATE__);

    let {image} = this.state;
    let imagePreview = null;
    if (image) {
      imagePreview = (<img src = {image} />);
    }
    else{
      imagePreview = (<div className = "noImageText"> Please select an image</div>);
    }

    return (
      <div>
        <form onSubmit = {(e) => this.handleSubmit(e)}>
          <input className = "imgInput"
            type = "file" onChange = {(e) => this.changeImage(e)} />
          
          <button style = {Styles.buttonStyle}>Upload an image!</button>
        </form>

        <div className = "imgPreview" style = {{margin: '10px', padding: '10px'}}>
          {imagePreview}
        </div>
      </div>
    );
  }
}

export default Upload;
