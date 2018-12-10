import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ROOT_URL_PROD } from '../utilities/constants'

import Clipboard from 'react-clipboard.js';

class UrlCopier extends PureComponent {
  static propTypes = {
    giftee: PropTypes.string
  }

  render() {
    const {
      giftee
    } = this.props;

    const url = `${ROOT_URL_PROD}?your_giftee=${giftee}`;

    return giftee ? (
      <Clipboard data-clipboard-text={ url }>
        Copy Link to Clipboard
      </Clipboard>
    ) : null;
  }
}

export default UrlCopier;
