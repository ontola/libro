import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import Heading from '../../../../components/Heading';
import LDLink from '../../../../components/LDLink';
import teamGL from '../../../../ontology/teamGL';
import { allTopologiesExcept } from '../../../../topologies';
import { pageTopology } from '../../../../topologies/Page';
import { selectTopology } from '../../../../topologies/Select';

const propTypes = {
  linkedProp: linkedPropType,
};

const Name = ({ linkedProp }) => (
  <LDLink>
    <Heading size="3">
      {linkedProp.value}
    </Heading>
  </LDLink>
);

Name.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Name,
  teamGL.Volunteer,
  schema.name,
  allTopologiesExcept(selectTopology, pageTopology)
);
