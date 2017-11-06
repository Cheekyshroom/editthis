import React from 'react';
import {connect} from 'react-redux';
import Store from '../stores/index';
import Styles from '../styles';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: ' ', imagePreviewUrl: ''};
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log('handling uploading-', this.state.file);
  }

  changeImage(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  onClick() {
    console.log('clicked');
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    console.log('props', window.__APP_INITIAL_STATE__);

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src = {imagePreviewUrl} />);
    }
    else{
      $imagePreview = (<div className = "noImageText"> Please select an image</div>);
    }


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


    const headerStyle = {
      textAlign: 'center',
      fontSize: '40px',
      color: 'white'
    };

    return (
      <body style = {{marginTop: '0', paddingTop: '0', textAlign: 'center'}}>

      <div>
        <p>
          <h1 style = {headerStyle}>
            Upload an image that you want your friends to edit!
          </h1>
        </p>
      </div>

      <div className = "previewComponent">
        <form onSubmit = {(e) => this.handleSubmit(e)}>
          <input className = "imgInput"
            type = "file" onChange = {(e) => this.changeImage(e)} />
          
          <button style = {buttonStyle}>Upload an image!</button>
        </form>

        <div className = "imgPreview" style = {{margin: '10px', padding: '10px'}}>
          {$imagePreview}
        </div>
      </div>
      
      </body>
    );
  }
}

//Upload = connect()(Stores.counter);

export default Upload;
