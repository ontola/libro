import { makeStyles } from '@mui/styles';
import { isNamedNode } from '@ontologies/core';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import { useGlobalIds } from 'link-redux';
import React from 'react';

import { useContainerToArr } from '../../../Core/hooks/useContainerToArr';
import useCounts from '../../hooks/votes/useCounts';
import argu from '../../lib/argu';

import VotePercentage, { voteDataVoteBarPartCID } from './VotePercentage';

export interface VoteDataProps {
  card?: boolean;
  hover?: boolean;
}

const useStyles = makeStyles({
  voteDataVoteBar: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  voteDataVoteBarCard: {
    [`& .${voteDataVoteBarPartCID}`]: {
      borderRadius: 'unset',
    },
  },
});

const VoteData = ({
  card,
  hover,
}: VoteDataProps): JSX.Element | null => {
  const [voteOptionsSequence] = useGlobalIds(argu.voteOptions);
  const [voteOptions] = useContainerToArr<SomeNode>(voteOptionsSequence);
  const counts = useCounts(voteOptions.filter(isNamedNode));
  const classes = useStyles();
  const className = clsx({
    [classes.voteDataVoteBar]: true,
    [classes.voteDataVoteBarCard]: card,
  });
  const totalCount = counts.reduce((a, b) => a + b, 0);

  if (counts.length <= 1) {
    return null;
  }

  return (
    <div className={className}>
      {voteOptions.map((option, index) => (
        <VotePercentage
          hover={hover}
          key={option?.value ?? `option-${index}`}
          option={isNamedNode(option) ? option : undefined}
          totalCount={totalCount}
          value={counts[index]}
        />
      ))}
    </div>
  );
};

VoteData.defaultProps = {
  hover: true,
};

export default VoteData;
