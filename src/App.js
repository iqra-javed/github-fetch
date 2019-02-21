import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AppBar from './components/AppBar';
import SearchInput from './components/SearchInput';
import RepoDetails from './components/Repo-Details';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="Github Browser" />
        <Route exact path ='/' component={SearchInput}/>
        <Route path ='/repos/:name' component={RepoDetails}/>
      </div>
    );
  }
}

export default App;
