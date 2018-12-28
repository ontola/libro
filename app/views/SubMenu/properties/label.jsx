import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import SideBarLinkLabel from '../../../components/SideBarLink/SideBarLinkLabel';
import { NS } from '../../../helpers/LinkedRenderStore';
import { headerTopology } from '../../../topologies/Header';

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
  [NS.argu('SubMenu'), NS.argu('MenuItem'), NS.argu('Menu')],
  NS.schema('name'),
  headerTopology
);
