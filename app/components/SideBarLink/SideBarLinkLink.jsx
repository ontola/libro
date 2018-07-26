import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { closeSideBar } from '../../state/sideBars/actions';

const propTypes = {
  children: PropTypes.node,
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

class SideBarLinkLink extends PureComponent {
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
          className="SideBarLink__link"
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    return (
      <NavLink
        activeClassName="SideBarLink--active"
        className="SideBarLink__link"
        exact={isIndex}
        to={to}
        onClick={onClick}
      >
        {children}
      </NavLink>
    );
  }
}

SideBarLinkLink.propTypes = propTypes;

const defaultAction = dispatch => () => dispatch(closeSideBar('Navbar'));

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeBarOnClick: (ownProps.onClick || defaultAction(dispatch)),
});

export default withRouter(connect(null, mapDispatchToProps)(SideBarLinkLink));
