import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { closeSideBar } from 'state/sideBars/actions';

import { retrievePath } from '../../../helpers/iris';
import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

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

const href = ({
  children, forSubMenu, handleClick, linkedProp
}) => (
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

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    hrefConnected,
    [NS.argu('Link'), NS.argu('MenuItem'), NS.argu('SubMenu')],
    NS.argu('href'),
    top
  );
});

export default href;
