import LinkedRenderStore from 'link-lib';
import { Property, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

import './name.scss';

const propTypes = {
  linkedProp: linkedPropType,
};

const OrganizationName = ({ linkedProp }) => (
  <div className="OrganizationName">
    <Property label={NS.schema('image')} />
    <span className="OrganizationName__value">{linkedProp.value}</span>
  </div>
);

OrganizationName.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  OrganizationName,
  [NS.schema('Organization'), NS.argu('Page')],
  [
    NS.schema('name'),
    NS.rdfs('label'),
    NS.foaf('name'),
  ],
  NS.argu('sidebarBlock')
);
