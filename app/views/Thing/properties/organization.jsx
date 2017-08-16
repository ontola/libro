import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
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
