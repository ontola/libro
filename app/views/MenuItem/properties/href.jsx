import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  SideBarLinkLink,
  SideBarLinkWrapper,
} from '../../../components/SideBarLink';
import { retrievePath } from '../../../helpers/iris';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  forSubMenu: PropTypes.bool,
  handleClick: PropTypes.func,
  linkedProp: linkedPropType,
};

const href = ({
  children, forSubMenu, handleClick, linkedProp
}) => {
  let hrefInner = children;
  if (linkedProp) {
    hrefInner = (
      <SideBarLinkLink
        activeClassName="SideBarLink--active"
        to={retrievePath(linkedProp)}
        onClick={handleClick}
      >
        {children}
      </SideBarLinkLink>
    );
  }

  return (
    <SideBarLinkWrapper bold={forSubMenu}>
      {hrefInner}
    </SideBarLinkWrapper>
  );
};

href.propTypes = propTypes;

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    href,
    [NS.argu('Link'), NS.argu('MenuItem'), NS.argu('SubMenu')],
    NS.argu('href'),
    top
  );
});

export default href;
