import { Color } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NamedNode, SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { tryParseInt } from '../../../helpers/numbers';
import useDisplayPercentage from '../../../hooks/useDisplayPercentage';
import argu from '../../../ontology/argu';
import { LibroTheme } from '../../../themes/themes';
import { allTopologies } from '../../../topologies';

export interface VotePercentageProps {
  label?: NamedNode;
  linkedProp: SomeTerm;
}
export const voteDataVoteBarPartCID = 'CID-VoteDataVoteBarPart';

type StyleProps = {
  displayPercentage: number;
  variant: string;
};

const useStyles = makeStyles<LibroTheme, StyleProps>((theme) => {
  const color = (props: StyleProps): Color => {
    switch (props.variant) {
    case 'yes': return theme.palette.green;
    case 'no': return theme.palette.brown;
    case 'abstain': return theme.palette.grey;
    case 'neutral': return theme.palette.grey;
    case 'other': return theme.palette.grey;
    case 'votesConCount': return theme.palette.brown;
    case 'votesNeutralCount': return theme.palette.grey;
    case 'votesProCount': return theme.palette.green;
    default: return theme.palette.grey;
    }
  };

  return {
    voteDataVoteBarPart: {
      '&:last-child': {
        marginRight: 0,
      },
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      marginRight: '3px',
      padding: '.2rem',
      transition: 'width 200ms ease-in-out',
      width: (props) => `${props.displayPercentage}%`,
    },
    voteDataVoteBarPartVariant: {
      '&:hover': {
        backgroundColor: (props) => color(props).dark,
      },
      backgroundColor: (props) => color(props).main,
    },
  };
});

const VotePercentage: FC<VotePercentageProps> = ({
  label,
  linkedProp,
}) => {
  const [votesConCount] = useProperty(argu.votesConCount);
  const [votesNeutralCount] = useProperty(argu.votesNeutralCount);
  const [votesProCount] = useProperty(argu.votesProCount);

  const sideCount = tryParseInt(linkedProp) ?? 0;
  const voteEventCount = (tryParseInt(votesConCount) ?? 0)
    + (tryParseInt(votesNeutralCount) ?? 0)
    + (tryParseInt(votesProCount) ?? 0);
  const option = label?.value?.split('#')?.pop();
  const [votePercentage, displayPercentage] = useDisplayPercentage(sideCount, voteEventCount);

  const classes = useStyles({
    displayPercentage,
    variant: option ?? 'default', 
  });

  return (
    <div
      className={clsx({
        [voteDataVoteBarPartCID]: true,
        [classes.voteDataVoteBarPart]: true,
        [classes.voteDataVoteBarPartVariant]: option,
      })}
      title={`${linkedProp.value} (${Math.round(votePercentage)}%)`}
    />
  );
};

VotePercentage.type = [argu.VoteEvent];

VotePercentage.topology = allTopologies;

VotePercentage.property = [
  argu.votesConCount,
  argu.votesNeutralCount,
  argu.votesProCount,
];

export default register(VotePercentage);
