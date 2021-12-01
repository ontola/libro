import { makeStyles } from '@material-ui/core/styles';
import { SomeTerm, isLiteral } from '@ontologies/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import { isString } from '../../helpers/types';
import { LibroTheme } from '../../themes/themes';

export const CHAR_COUNTER_THRESHOLD = 0.8;

interface PropTypes {
  maxLength: number;
  threshold: number;
  value: SomeTerm | string;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  charCounter: {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    color: theme.palette.grey[600],
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
