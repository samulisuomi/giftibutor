import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UrlCopier extends PureComponent {
  static propTypes = {
    giftee: PropTypes.string
  }

  render() {
    const {
      giftee
    } = this.props;

    return giftee ? (
      <span>{ giftee }</span>
    ) : null;
  }
}

export default UrlCopier;
