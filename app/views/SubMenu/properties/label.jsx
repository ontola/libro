import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import HeaderLinkLabel from '../../../components/HeaderLink/HeaderLinkLabel';
import { NS } from '../../../helpers/LinkedRenderStore';
import { headerTopology } from '../../../topologies/Header';

const propTypes = {
  linkedProp: linkedPropType,
};

const SubMenuLabelProp = ({ linkedProp }) => (
  <HeaderLinkLabel>
    {linkedProp.value}
  </HeaderLinkLabel>
);

SubMenuLabelProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  SubMenuLabelProp,
  [NS.argu('SubMenu'), NS.argu('MenuItem'), NS.argu('Menu')],
  NS.schema('name'),
  headerTopology
);
