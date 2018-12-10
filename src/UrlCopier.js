import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router'
import Clipboard from 'react-clipboard.js';

class UrlCopier extends PureComponent {
  static propTypes = {
    giftee: PropTypes.string,
    router: PropTypes.func.isRequired
  }

  render() {
    const {
      giftee
    } = this.props;

    return giftee ? (
      <Clipboard data-clipboard-text={ `https://sasuomi.github.io/giftibutor?your_giftee=${giftee}` }>
        Copy Link to Clipboard
      </Clipboard>
    ) : null;
  }
}

export default withRouter(UrlCopier);
