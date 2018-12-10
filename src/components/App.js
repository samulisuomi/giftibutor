import React, { PureComponent } from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import PersonForm from './PersonForm'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#81c784',
    },
    secondary: amber
  }
});

class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <h1>Giftibutor</h1>
              <h2>the Secret Santa generator</h2>
            </header>
            <main className="App-main">
              <PersonForm />
            </main>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
