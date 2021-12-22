import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';

import { voteDataVoteBarPartCID } from '../../views/VoteEvent/properties/votePercentage';

export interface VoteDataProps {
  card?: boolean;
  children: React.ReactNode;
}

const useStyles = makeStyles( {
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
  children,
}: VoteDataProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.voteDataVoteBar]: true,
        [classes.voteDataVoteBarCard]: card,
      })}
    >
      {children}
    </div>
  );
};

VoteData.defaultProps = {
  hover: true,
};

export default VoteData;
