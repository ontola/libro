import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const SubMenuLabelProp = ({ linkedProp }) => (
  <div className="SideBarLink__label">
    {linkedProp}
  </div>
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
