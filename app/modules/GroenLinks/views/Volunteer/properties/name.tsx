import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { PropertyProps } from 'link-redux';
import React from 'react';

import teamGL from '../../../ontology/teamGL';
import {
  allTopologiesExcept,
  pageTopology,
  selectTopology,
} from '../../../../../topologies';
import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import LDLink from '../../../../Common/components/LDLink';

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
