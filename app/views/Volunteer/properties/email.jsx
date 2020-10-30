import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import teamGL from '../../../ontology/teamGL';
import { allTopologiesExcept } from '../../../topologies';
import { tableRowTopology } from '../../../topologies/TableRow';

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
  [teamGL.Volunteer, teamGL.OnlineCampaigner],
  schema.email,
  allTopologiesExcept(tableRowTopology)
);
