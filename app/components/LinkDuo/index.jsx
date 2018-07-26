import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isExternal from 'is-url-external';

const propTypes = {
  to: PropTypes.string.isRequired,
};

/**
 * Link that also works for external URL's. Don't pass a href attribute.
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class LinkDuo extends Component {
  render() {
    if (isExternal(this.props.to)) {
      return (
        <a
          href={this.props.to}
          {...this.props}
          rel="nofollow noopener noreferrer"
          target="_blank"
        />
      );
    }

    return <Link {...this.props} />;
  }
}

LinkDuo.propTypes = propTypes;
