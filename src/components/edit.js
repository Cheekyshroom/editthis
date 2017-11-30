import React from 'react';
import {Link} from 'react-router-dom';
import Upload from '../pages/upload';
import Home from '../pages/home';
import Styles from '../styles';

class Edit extends React.Component {
  constructor() {
    
  }
  

  render() {

    return (
      <div style={{
        width: '100%',
        textAlign:'center',
        height: '500',
        border: '1px solid #000000',
        background: Styles.white,
        display: 'block',
        justifyContent: 'center',
      }}>
<script type="text/javascript" src="http://feather.aviary.com/imaging/v3/editor.js"></script>


<script type="text/javascript">

    var featherEditor = new Aviary.Feather({
        apiKey: '1234567',
        onSave: function(imageID, newURL) {
            var img = document.getElementById(imageID);
            img.src = newURL;
        }
    });

    function launchEditor(id, src) {
        featherEditor.launch({
            image: id,
            url: src
        });
        return false;
    }

</script>   
      </div>
    );
  }
}

export default Edit;
