import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

import './name.scss';

const propTypes = {
  linkedProp: linkedPropVal,
};

const OrganizationName = ({ linkedProp }) => (
  <div className="OrganizationName">
    <Property label="schema:image" />
    <span className="OrganizationName__value">{linkedProp}</span>
  </div>
);

OrganizationName.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  OrganizationName,
  'http://schema.org/Organization',
  [
    'http://schema.org/name',
    'http://www.w3.org/2000/01/rdf-schema#label',
    'http://xmlns.com/foaf/0.1/name',
  ],
  'argu:sidebarBlock'
);

export default OrganizationName;
