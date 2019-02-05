import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
};

class NavbarLinkWrapper extends PureComponent {
  render() {
    const { children, bold } = this.props;

    const classes = classNames({
      NavbarLink: true,
      'NavbarLink--bold': bold,
    });

    return <div className={classes}>{children}</div>;
  }
}

NavbarLinkWrapper.propTypes = propTypes;

export default NavbarLinkWrapper;
