import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

import './name.scss';

const propTypes = {
  linkedProp: linkedPropVal,
};

const OrganizationName = ({ linkedProp }) => (
  <div className="OrganizationName">
    <Property label={NS.schema('image')} />
    <span className="OrganizationName__value">{linkedProp}</span>
  </div>
);

OrganizationName.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  OrganizationName,
  NS.schema('Organization'),
  [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ],
  NS.argu('sidebarBlock')
);

export default OrganizationName;
