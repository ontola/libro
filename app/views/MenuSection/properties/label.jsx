import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const MenuSectionLabel = ({ linkedProp }) => (
  <div className="MenuSectionLabel">
    <div className="MenuSectionLabel__bar" />
    <div className="MenuSectionLabel__text" >
      {linkedProp}
    </div>
    <div className="MenuSectionLabel__bar" />
  </div>
);

MenuSectionLabel.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  MenuSectionLabel,
  [NS.argu('MenuSection')],
  NS.argu('label'),
  NS.argu('sidebar')
);
