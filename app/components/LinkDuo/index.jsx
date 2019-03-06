import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isExternal from 'is-url-external';

import Link from '../Link';

const propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

/**
 * Link that also works for external URL's. Don't pass a href attribute.
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class LinkDuo extends Component {
  render() {
    if (isExternal(this.props.to)) {
      const {
        children,
        ...rest
      } = this.props;
      return (
        <a
          href={this.props.to}
          {...rest}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    return <Link {...this.props} />;
  }
}

LinkDuo.propTypes = propTypes;
