import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const MenuSectionLabel = ({ linkedProp }) => (
  <div className="MenuSectionLabel" data-test="MenuSection-MenuSectionLabel">
    <div className="MenuSectionLabel__bar" />
    <div className="MenuSectionLabel__text">
      {linkedProp.value}
    </div>
    <div className="MenuSectionLabel__bar" />
  </div>
);

MenuSectionLabel.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  MenuSectionLabel,
  NS.argu('MenuSection'),
  NS.argu('label'),
  NS.argu('sidebar')
);
