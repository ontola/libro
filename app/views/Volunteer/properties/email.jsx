import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const Email = ({ linkedProp }) => (
  <div className="Volunteer--contact-option">
    <a href={`mailto:${linkedProp.value}`} target="_top">
      {emoji(`📩 ${linkedProp.value}`)}
    </a>
  </div>
);

Email.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Email,
  teamGL.Volunteer,
  schema.email,
  allTopologies
);
