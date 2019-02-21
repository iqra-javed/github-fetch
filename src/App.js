import React, { Component } from 'react';

import AppBar from './components/AppBar';
import SearchInput from './components/SearchInput';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="Github Browser" />
        <SearchInput />
      </div>
    );
  }
}

export default App;
