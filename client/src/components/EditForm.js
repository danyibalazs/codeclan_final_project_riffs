import React, { useState } from 'react';
import axios from 'axios';

const EditForm = (props) => {
    
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  const originalTitle = props.location.state.title;
  const originalDescription = props.location.state.description;
  const id = props.location.state.id;

  const handleTitleChange = event => {
    const newTitle = event.target.value;
    setTitle(newTitle);
  }

  const handleDescriptionChange = event => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  }

  const handleEdit = event => {
    event.preventDefault();

    axios.put("/api/riffs/edit/" + id, {
      title: title,
      description: description
    })
    .then(() => {
      this.props.history.push("/");
    })
    .catch(error => {
    });
    
    setMessage(<div className="success">Update complete</div>);
    document.querySelector(".edit-form-hiding").style.display = "none";
    setTimeout(function(){ window.location.href = "http://localhost:3000/FileList"; }, 500);
	}

  return ( 
    <> 
      <div className="form-style-5">
        { message }
        <div className="edit-form-hiding">
          <form onSubmit={handleEdit}>
            <input required
              type="text" 
              placeholder={originalTitle}
              onChange={handleTitleChange}/>

            <textarea
              placeholder={originalDescription}
              maxLength="100"
              rows="3" 
              onChange={handleDescriptionChange}/>

            <input
              type="submit" 
              value="Edit" />
          </form>
        </div>
      </div>
    </>    
  )
}         
export default EditForm;