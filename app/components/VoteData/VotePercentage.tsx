import { darken, lighten } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useStrings,
} from 'link-redux';
import React from 'react';

import { NAME_PREDICATES } from '../../helpers/metaData';
import useDisplayPercentage from '../../hooks/useDisplayPercentage';
import { LibroTheme } from '../../themes/themes';

export const voteDataVoteBarPartCID = 'CID-VoteDataVoteBarPart';

const DARKEN_COEFFICIENT = 0.2;
const LIGHTEN_COEFFICIENT = 0.9;

export interface VotePercentageProps {
  hover?: boolean;
  option?: SomeNode;
  totalCount: number;
  value?: number;
}

type StyleProps = {
  displayPercentage: number;
  color?: string;
};

const useStyles = makeStyles<LibroTheme, StyleProps>(() => ({
  colored: ({ color }) => ({
    '&:hover': {
      backgroundColor: color ? darken(color, DARKEN_COEFFICIENT) : undefined,
    },
    backgroundColor: color,
  }),
  hoverColored: ({ color }) => ({
    '&:hover': {
      backgroundColor: color,
    },
    backgroundColor: color ? lighten(color, LIGHTEN_COEFFICIENT) : undefined,
  }),
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
    width: ({ displayPercentage }) => `${displayPercentage}%`,
  },
}));

const VotePercentage = ({
  hover,
  option,
  totalCount,
  value,
}: VotePercentageProps): JSX.Element => {
  useDataFetching([option].filter(isNamedNode));
  const [color] = useStrings(option, schema.color);
  const [name] = useStrings(option, NAME_PREDICATES);
  const sideCount = value ?? 0;
  const [votePercentage, displayPercentage] = useDisplayPercentage(sideCount, totalCount);
  const classes = useStyles({
    color,
    displayPercentage,
  });

  const className = clsx({
    [voteDataVoteBarPartCID]: true,
    [classes.voteDataVoteBarPart]: true,
    [classes.colored]: color && !hover,
    [classes.hoverColored]: color && hover,
  });

  return (
    <div
      className={className}
      style={{ width: `${displayPercentage}%` }}
      title={`${name}: ${sideCount} (${Math.round(votePercentage)}%)`}
    />
  );
};

export default VotePercentage;
