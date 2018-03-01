import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { closeSideBar } from '../../state/sideBars/actions';

const propTypes = {
  children: PropTypes.node,
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

const SideBarLinkLink = ({
  children,
  isIndex,
  onClick,
  to,
}) => (
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

SideBarLinkLink.propTypes = propTypes;

const defaultAction = dispatch => () => dispatch(closeSideBar('Navbar'));

// The 'null' and 'pure:false': https://github.com/ReactTraining/react-router/issues/3536
export default connect(
  null,
  (dispatch, ownProps) => ({
    closeBarOnClick: (ownProps.onClick || defaultAction(dispatch)),
  }),
  null,
  { pure: false }
)(SideBarLinkLink);
