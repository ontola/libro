import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
    return isExternal(this.props.to) ?
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={this.props.to}
        {...this.props}
      />
      :
      <Link {...this.props} />;
  }
}

LinkDuo.propTypes = propTypes;
