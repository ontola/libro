import LinkedRenderStore from 'link-lib';
import { linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { LDLink } from '../../../components';

const propTypes = {
  linkedProp: linkedPropType,
};

const ClickableCover = ({ linkedProp }) => (
  <LDLink>
    <LinkedResourceContainer subject={linkedProp} />
  </LDLink>
);

ClickableCover.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ClickableCover,
  NS.schema('Thing'),
  NS.argu('coverPhoto'),
  [
    NS.argu('card'),
    NS.argu('cardFixed'),
  ]
);
