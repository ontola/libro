import LinkedRenderStore from 'link-lib';
import React from 'react';

import { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const SubMenuLabelProp = ({ linkedProp }) => (
  <div className="SideBarLink__label">
    {linkedProp}
  </div>
);

SubMenuLabelProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  SubMenuLabelProp,
  'argu:SubMenu',
  'argu:label',
  'sidebar'
);
