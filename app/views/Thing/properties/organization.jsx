import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingOrganizationProp = ({ linkedProp }) =>
  <LinkedObjectContainer object={linkedProp} topology={NS.argu('sidebarBlock')} />;

ThingOrganizationProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingOrganizationProp,
  NS.schema('Thing'),
  NS.schema('organization')
);

export default ThingOrganizationProp;
