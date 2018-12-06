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
            Giftibutor v0.1
          </header>
          <main className="App-main">
            <NameForm />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
