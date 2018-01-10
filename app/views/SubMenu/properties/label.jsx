import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import SideBarLinkLabel from '../../../components/SideBarLink/SideBarLinkLabel';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const SubMenuLabelProp = ({ linkedProp }) => (
  <SideBarLinkLabel>
    {linkedProp.value}
  </SideBarLinkLabel>
);

SubMenuLabelProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  SubMenuLabelProp,
  [NS.argu('SubMenu'), NS.argu('MenuItem')],
  NS.argu('label'),
  [NS.argu('sidebar'), NS.argu('sidebarBlock')]
);
