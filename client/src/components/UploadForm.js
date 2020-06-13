import React, { useState } from 'react';
import axios from 'axios';

import './UploadForm.css';

const UploadForm = () => {
    
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type !== 'audio/mpeg'){
        console.log('Please select an audio file!');
        return;
      }
    setFile(selectedFile);
  }

  const handleTitleChange = event => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  }

  const handleDescriptionChange = event => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  }

  const clearForm = () => {
    const form = document.querySelector('form');
    form.reset()
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    setMessage(<div className="progress">Uploading...</div>);
    
    const data = new FormData();// If file selected
      if ( file ) {
        data.append( 'file', file);
        data.append( 'title', title );
        data.append( 'description', description );
    
    axios.post( '/api/riffs/upload', data, {
			headers: {
			 'accept': 'application/json',
			 'Accept-Language': 'en-US,en;q=0.8',
			 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
			}
		})
	  .then( ( response ) => {if ( 200 === response.status ) {
			// If file size is larger than expected.
			if( response.data.error ) {
				if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
				 } else {
					console.log( response.data );// If not the given file type
				 }
			} else {
          // Success
          setMessage(<div className="success">Your riff is ours now!</div>)
          clearForm();
			  }
		  }
    }).catch( ( error ) => {
        // If another error
        console.log('error'); 
		});
		} else {
        // if file not selected throw error
        console.log('error'); 	
		}
  };

  return (
    <div className="form-style-5">
      { message }
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="File title" 
          onChange={handleTitleChange}/>

        <input 
          type="file" 
          onChange={handleFileChange}/>

        <textarea 
          placeholder="Description here..." 
          maxLength="100"
          rows="3" 
          onChange={handleDescriptionChange}/>

        <input
          type="submit" 
          value="Upload" />
      </form>
    </div>    
  )
}         
export default UploadForm;