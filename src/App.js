import React, { Component } from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import NameForm from './NameForm'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#81c784',
    },
    secondary: amber
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <h1>
              Giftibutor v0.1
            </h1>
          </header>
          <h1>asdasd</h1>
          <h2>asdasd</h2>
          <p>asdasd</p>
          <main className="App-main">
            <NameForm />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
