import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
};

class SideBarLinkWrapper extends PureComponent {
  render() {
    const { children, bold } = this.props;

    const classes = classNames({
      SideBarLink: true,
      'SideBarLink--bold': bold,
    });

    return <div className={classes}>{children}</div>;
  }
}

SideBarLinkWrapper.propTypes = propTypes;

export default SideBarLinkWrapper;
