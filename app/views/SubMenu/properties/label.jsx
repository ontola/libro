import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import SideBarLinkLabel from '../../../components/SideBarLink/SideBarLinkLabel';

const propTypes = {
  linkedProp: linkedPropType,
};

const SubMenuLabelProp = ({ linkedProp }) => (
  <SideBarLinkLabel>
    {linkedProp}
  </SideBarLinkLabel>
);

SubMenuLabelProp.propTypes = propTypes;

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    SubMenuLabelProp,
    [NS.argu('SubMenu'), NS.argu('MenuItem')],
    NS.argu('label'),
    top
  );
});
