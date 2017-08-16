import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

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
  NS.argu('SubMenu'),
  NS.argu('label'),
  NS.argu('sidebar')
);
