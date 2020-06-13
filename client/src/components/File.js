import React, {useState} from 'react';
import { Link } from "react-router-dom";

import './File.css';

const File = (props) => {

  return (
    <div className="file">
      <div>
        <h5>{props.title}</h5>
        <audio controls id="audioplayer">
            <source src={props.url} type="audio/mpeg" />
              Your browser does not support the audio element.
        </audio>
        <details>
          <summary>Details</summary>
            <div>
              <h6>Description: {props.description}</h6>    
            </div>
                
            <div className="editdeletediv">
              <Link to={{
                pathname: '/EditForm',
                state: {
                  title: props.title,
                  description: props.description,
                  id: props.id
                  }
                }}><button className="fa fa-edit" /></Link>

					    <Link to={{
                pathname: '/DeleteForm',
                state: {
							    title: props.title,
                  id: props.id,
                  fileName: props.fileName
                  }
                }}><button className="fa fa-trash" /></Link>			
            </div>  
        </details>
      </div>
    </div>
  )
}

export default File;