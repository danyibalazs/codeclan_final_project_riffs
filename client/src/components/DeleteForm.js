import React, {useState} from 'react';
import axios from 'axios';

import './DeleteForm.css';

const DeleteForm = (props) => {
    
  const title = props.location.state.title;
    const id = props.location.state.id;
    const [message, setMessage] = useState(null);
    
    const handleDelete = event => {
      axios.delete("/api/riffs/" + id)
      .then(( response ) => { if ( 200 === response.status ){
        document.querySelector(".delete-form-hiding").style.display = "none";
        setMessage(<div className="progress">Your riff has been destroyed</div>);
        setTimeout(function(){ window.location.href = "http://localhost:3000/FileList"; }, 500);
        }
      })
    };
    
    const handleCancelDelete = event => {
        window.location.href = "http://localhost:3000/FileList";
    }
    
    return (
      <div className="form-style-5">
        {message}
        <div className="delete-form-hiding">
          <h3>Are you sure?</h3>
          <h1>{title}</h1>
          <button id="deletebutton" onClick={handleDelete}>DELETE</button>
          <button id="canceldeletebutton" onClick={handleCancelDelete}>BACK</button>
          </div>
      </div>
    )
}

export default DeleteForm;

