import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Router basename={ process.env.PUBLIC_URL }>
          <div className="App">
            <header className="App-header">
              <h1>
                Giftibutor
              </h1>
            </header>
            <main className="App-main">
              <Switch>
                <Route path="/" exact component={NameForm} />
                <Route path="/giftee" exact component={() => (<span children="TODO" />)} />
                <Route component={() => (<span children="Not Found" />)} />
              </Switch>
            </main>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
