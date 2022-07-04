import makeStyles from '@mui/styles/makeStyles';
import { SomeTerm, isLiteral } from '@ontologies/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { isString } from '../../../Kernel/lib/typeCheckers';

export const CHAR_COUNTER_THRESHOLD = 0.8;

interface PropTypes {
  maxLength: number;
  threshold: number;
  value: SomeTerm | string;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  charCounter: {
    color: theme.palette.grey.main,
  },
  error: {
    color: theme.palette.error.dark,
  },
}));

const CharCounter: React.FC<PropTypes> = ({
  maxLength,
  threshold,
  value,
}) => {
  let currentLength;

  if (isLiteral(value)) {
    currentLength = value.value.length;
  } else if (isString(value)) {
    currentLength = value.length;
  } else {
    return null;
  }

  if (threshold && (!currentLength || (currentLength / maxLength) <= threshold)) {
    return null;
  }

  if (!maxLength) {
    return null;
  }

  const classes = useStyles();
  const className = clsx({
    [classes.charCounter]: true,
    [classes.error]: !!maxLength && (maxLength < currentLength),
  });

  return (
    <span className={className}>
      {currentLength}
      /
      {maxLength}
    </span>
  );
};

export default CharCounter;
