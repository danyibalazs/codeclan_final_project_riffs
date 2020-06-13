import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
 
 return (
  <div>
    <ul>
      <li>
        <NavLink to="/Home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/UploadForm">Upload Riff</NavLink>
      </li>
      <li>
          <NavLink to="/FileList" onClick={props.refreshList}>Riff Browser</NavLink>
      </li>
    </ul>
  </div> 
 )
};

export default NavBar;