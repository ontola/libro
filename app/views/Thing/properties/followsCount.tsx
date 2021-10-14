import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const FollowsCount = ({ linkedProp }: PropertyProps): JSX.Element | null => {
  if (tryParseInt(linkedProp) === 0) {
    return null;
  }

  return (
    <Detail
      icon="user-o"
      text={linkedProp.value}
      title={`${linkedProp.value} volgers`}
    />
  );
};

FollowsCount.type = schema.Thing;

FollowsCount.property = argu.followsCount;

FollowsCount.topology = detailsBarTopology;

export default register(FollowsCount);
