import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { closeSideBar } from 'state/sideBars/actions';

import { retrievePath } from '../../../helpers/iris';
import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  forSubMenu: PropTypes.bool,
  handleClick: PropTypes.func,
  linkedProp: linkedPropVal,
};

const classString = forSubMenu => classNames({
  SideBarLink: true,
  'SideBarLink--bold': forSubMenu,
});

const href = ({ children, forSubMenu, handleClick, linkedProp }) => (
  <div className={classString(forSubMenu)}>
    <Link
      activeClassName="SideBarLink--active"
      to={retrievePath(linkedProp)}
      onClick={handleClick}
    >
      {children}
    </Link>
  </div>
);

href.propTypes = propTypes;

const hrefConnected = connect(
  null,
  dispatch => ({
    handleClick: () => dispatch(closeSideBar('Navbar')),
  }),
  null,
  { pure: false }
)(href);

LinkedRenderStore.registerRenderer(
  hrefConnected,
  'argu:Link',
  ['argu:href'],
  'sidebar'
);

export default href;
