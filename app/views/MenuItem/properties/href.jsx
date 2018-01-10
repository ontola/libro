import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  SideBarLinkLink,
  SideBarLinkWrapper,
} from '../../../components/SideBarLink';
import { retrievePath } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
  linkedProp: linkedPropType,
};

const href = ({
  children, handleClick, linkedProp
}) => {
  let hrefInner = children;
  if (linkedProp) {
    hrefInner = (
      <SideBarLinkLink
        to={retrievePath(linkedProp.value)}
        onClick={handleClick}
      >
        {children}
      </SideBarLinkLink>
    );
  }

  return (
    <SideBarLinkWrapper>
      {hrefInner}
    </SideBarLinkWrapper>
  );
};

href.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  href,
  [NS.argu('Link'), NS.argu('MenuItem'), NS.argu('SubMenu'), NS.argu('NavigationsMenu')],
  NS.argu('href'),
  [NS.argu('sidebar'), NS.argu('sidebarBlock')]
);
