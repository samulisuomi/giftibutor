import React, { PureComponent } from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import queryString from 'query-string';

import { ROOT_URL_DEV, ROOT_URL_PROD } from '../utilities/constants';
import { decrypt } from '../utilities/encryption';

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
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: Boolean(this.getGiftee())
    };
  }

  getRootUrl = () => {
    return window.location.href.includes(ROOT_URL_DEV) ?
      ROOT_URL_DEV : ROOT_URL_PROD
  }

  getGiftee = () => {
    const queryParams = queryString.parse(window.location.search)

    return queryParams && queryParams.your_giftee && queryParams.your_giftee.length ?
      decrypt(queryParams.your_giftee) :
      null;
  }

  handleDialogClose = () => {
    // We're ignoring this is an SPA 'cause this is quick and simple vs react-router:
    window.location.assign(this.getRootUrl());
  }

  render() {
    const giftee = this.getGiftee();

    return (
      <MuiThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <h1>Giftibutor</h1>
              <h2>the Secret Santa generator</h2>
            </header>
            <main className="App-main">
              <PersonForm />
              <Dialog
                open={ this.state.dialogOpen }
              >
                <DialogContent className="giftee-dialog-content">
                  <h1><span role="img" aria-label="Santa Claus">🎅</span></h1>
                  <h2>Your secret person is:</h2>
                  <p>{ giftee }</p>
                  <Button
                    children="Close"
                    variant="contained"
                    color="primary"
                    onClick={ this.handleDialogClose }
                  />
                </DialogContent>
              </Dialog>
            </main>
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
