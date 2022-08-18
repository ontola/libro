import { FormControl } from '@mui/material';
import { isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  PropertyProps,
  register,
  useIds, 
} from 'link-redux';
import React from 'react';

import { mainBodyTopology } from '../../../../Common/topologies';
import LinkLoader from '../../../../Kernel/components/LinkLoader';
import { useContainerToArr } from '../../../../Kernel/hooks/useContainerToArr';
import PollOption from '../../../components/PollOption';
import useCounts from '../../../hooks/votes/useCounts';
import useCurrentVote from '../../../hooks/votes/useCurrentVote';
import argu from '../../../ontology/argu';

const VoteOptions: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const [options, loading] = useContainerToArr<SomeNode>(isNamedNode(linkedProp) ? linkedProp : undefined);
  const [createAction] = useIds(argu.createVote);
  const [currentVote, currentOption] = useCurrentVote();
  const counts = useCounts(options.filter(isNamedNode));
  const totalCount = counts.reduce((a, b) => a + b, 0);

  if (loading) {
    return <LinkLoader />;
  }

  return (
    <FormControl>
      {(options.map((option) => (
        <PollOption
          createAction={createAction}
          currentOption={currentOption}
          currentVote={currentVote}
          key={option.value}
          option={option}
          totalCount={totalCount}
        />
      )))}
    </FormControl>
  );
};

VoteOptions.type = argu.Poll;

VoteOptions.topology = mainBodyTopology;

VoteOptions.property = argu.voteOptions;

export default register(VoteOptions);
