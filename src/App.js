import React, { Component } from 'react';
import './App.css';

import NameForm from './NameForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Giftibutor v0.1
        </header>
        <NameForm />
      </div>
    );
  }
}

export default App;
