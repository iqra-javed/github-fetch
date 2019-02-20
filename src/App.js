import React, { Component } from 'react';

import AppBar from './components/AppBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="Github Browser" />
      </div>
    );
  }
}

export default App;
