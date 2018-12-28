import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
};

class HeaderLinkWrapper extends PureComponent {
  render() {
    const { children, bold } = this.props;

    const classes = classNames({
      HeaderLink: true,
      'HeaderLink--bold': bold,
    });

    return <div className={classes}>{children}</div>;
  }
}

HeaderLinkWrapper.propTypes = propTypes;

export default HeaderLinkWrapper;
