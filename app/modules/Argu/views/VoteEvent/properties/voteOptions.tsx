import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  PropertyProps,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import { actionsBarTopology } from '../../../../Action/topologies';
import { cardFloatTopology } from '../../../../Common/topologies';
import LinkLoader from '../../../../Kernel/components/LinkLoader';
import { useContainerToArr } from '../../../../Kernel/hooks/useContainerToArr';
import VoteButton from '../../../components/VoteButton/VoteButton';
import useCurrentVote from '../../../hooks/votes/useCurrentVote';
import argu from '../../../ontology/argu';

const VoteOptions: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const [options, loading] = useContainerToArr<SomeNode>(isNamedNode(linkedProp) ? linkedProp : undefined);
  const [createAction] = useIds(argu.createVote);
  const [currentVote, currentOption] = useCurrentVote();

  if (loading) {
    return <LinkLoader />;
  }

  return (
    <React.Fragment>
      {options.map((option) => (
        <VoteButton
          createAction={createAction}
          currentOption={currentOption}
          currentVote={currentVote}
          grow={options.length > 1}
          key={option.value}
          option={option}
        />
      ))}
    </React.Fragment>
  );
};

VoteOptions.type = schema.Thing;

VoteOptions.topology = [
  actionsBarTopology,
  cardFloatTopology,
];

VoteOptions.property = argu.voteOptions;

export default register(VoteOptions);
