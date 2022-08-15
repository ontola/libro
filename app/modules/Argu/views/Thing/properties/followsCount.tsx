import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import Detail from '../../../../Common/components/Detail';
import { tryParseInt } from '../../../../Common/lib/numbers';
import { detailsBarTopology } from '../../../../Common/topologies';
import argu from '../../../ontology/argu';

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
