import { Variant } from '@material-ui/core/styles/createTypography';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { isNode } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

export interface TypographyElementProps {
  children?: React.ReactChildren;
}

const useStyles = makeStyles({
  body1: {
    maxWidth: 'clamp(30ch, 100%, 90ch)',
  },
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.5rem',
  },
  h3: {
    fontSize: '1.2rem',
  },
});

export const createTypographyComponent = (variant: Variant) => ({ children }: TypographyElementProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Typography
      classes={classes}
      gutterBottom={['h1', 'h2', 'h3'].includes(variant)}
      paragraph={variant === 'body1'}
      variant={variant}
    >
      {isNode(children) ? <Resource subject={children} /> : children}
    </Typography>
  );
};
