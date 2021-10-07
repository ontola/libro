import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../../../components/Heading';
import LDLink from '../../../../../components/LDLink';
import teamGL from '../../../../../ontology/teamGL';
import { allTopologiesExcept } from '../../../../../topologies';
import { pageTopology } from '../../../../../topologies/Page';
import { selectTopology } from '../../../../../topologies/Select';

const Name = ({ linkedProp }: PropertyProps) => (
  <LDLink>
    <Heading size={HeadingSize.MD}>
      {linkedProp.value}
    </Heading>
  </LDLink>
);

export default LinkedRenderStore.registerRenderer(
  Name,
  teamGL.Volunteer,
  schema.name,
  allTopologiesExcept(selectTopology, pageTopology),
);
