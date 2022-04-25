import { isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  PropertyProps,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import LinkLoader from '../../../components/Loading/LinkLoader';
import VoteButton from '../../../components/VoteButton/VoteButton';
import { useContainerToArr } from '../../../hooks/useContainerToArr';
import useCurrentVote from '../../../hooks/votes/useCurrentVote';
import argu from '../../../ontology/argu';
import { mainBodyTopology } from '../../../topologies';
import ActionsBar from '../../../topologies/ActionsBar';

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
    <ActionsBar>
      {options.map((option) => (
        <VoteButton
          createAction={createAction}
          currentOption={currentOption}
          currentVote={currentVote}
          grow={false}
          key={option.value}
          option={option}
        />
      ))}
    </ActionsBar>
  );
};

VoteOptions.type = argu.Poll;

VoteOptions.topology = mainBodyTopology;

VoteOptions.property = argu.voteOptions;

export default register(VoteOptions);
