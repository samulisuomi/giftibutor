import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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

class App extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>
                Giftibutor v0.1
              </h1>
            </header>
            <main className="App-main">
              <Route path="/" exact component={NameForm} />
              <Route path="/giftee" exact component={() => (<span>TODO</span>)} />
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
