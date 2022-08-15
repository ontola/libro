import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import LDLink from '../../../../Common/components/LDLink';
import { pageTopology } from '../../../../Common/topologies';
import { selectTopology } from '../../../../Form/topologies';
import teamGL from '../../../ontology/teamGL';

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
