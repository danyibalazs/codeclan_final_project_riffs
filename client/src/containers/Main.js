import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Home from '../components/Home';
import UploadForm from '../components/UploadForm';
import EditForm from '../components/EditForm';
import DeleteForm from '../components/DeleteForm';
import FileList  from '../components/FileList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import './Main.css';

const Main = () => {
    
  const [files, setFiles] = useState(null);

  useEffect(() => {
    axios.get("/api/riffs")
    .then(res => {
      setFiles(res.data)
    });
  },[])  
    
  const refreshList = event => {
    axios.get("/api/riffs")
    .then(res => {
      setFiles(res.data)
    });
  }

  return(
    <div className="main">
      <header>
        <img src="../../riffs.png" id="logo" alt="logo"/>
      </header>
                
      <Router>
        <React.Fragment>
          <div className="navbar">
            <NavBar refreshList={refreshList}/>
          </div>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/UploadForm" component={UploadForm} />
            <Route path="/FileList" render={() => <FileList files={files}/>}/>
            <Route path="/EditForm" component={EditForm} />
            <Route path="/DeleteForm" component={DeleteForm} />
          </div>
        </React.Fragment>
      </Router>              
    </div>
  )
}

export default Main;
