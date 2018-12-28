import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';

import {
  isDifferentOrigin,
  isLocalAnchor,
  retrievePath,
} from '../../helpers/iris';
import { closeSideBar } from '../../state/sideBars/actions';

const propTypes = {
  children: PropTypes.node,
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

class HeaderLinkLink extends PureComponent {
  render() {
    const {
      children,
      isIndex,
      onClick,
      to,
    } = this.props;

    if (to === undefined) {
      return (
        <button
          className="HeaderLink__link"
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    if (isDifferentOrigin(to)) {
      return (
        <a
          className="HeaderLink__link"
          href={to}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    const path = retrievePath(to);
    const LinkComp = isLocalAnchor(path) ? Link : NavLink;

    return (
      <LinkComp
        activeClassName="HeaderLink--active"
        className="HeaderLink__link"
        exact={isIndex}
        to={path}
        onClick={onClick}
      >
        {children}
      </LinkComp>
    );
  }
}

HeaderLinkLink.propTypes = propTypes;

const defaultAction = dispatch => () => dispatch(closeSideBar('Navbar'));

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeBarOnClick: (ownProps.onClick || defaultAction(dispatch)),
});

export default withRouter(connect(null, mapDispatchToProps)(HeaderLinkLink));
