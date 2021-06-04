import { Variant } from '@material-ui/core/styles/createTypography';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { isNode } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface TypographyElementProps {
  children?: React.ReactChildren;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify',
}

const useStyles = makeStyles<LibroTheme, TypographyElementProps>((theme) => ({
  body1: {
    marginLeft: ({ align }) => align === 'center' ? 'auto' : '0',
    marginRight: ({ align }) => align === 'center' ? 'auto' : '0',
    maxWidth: 'clamp(30ch, 90%, 90ch)',
  },
  h1: {
    fontSize: '2rem',
  },
  h2: {
    fontSize: '1.7rem',
  },
  h3: {
    fontSize: '1.4rem',
  },
  h4: {
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export const createTypographyComponent = (variant: Variant) => ({
  align,
  children,
}: TypographyElementProps): JSX.Element => {
  const classes = useStyles({ align });

  return (
    <Typography
      align={align ?? 'inherit'}
      classes={classes}
      gutterBottom={['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)}
      paragraph={variant === 'body1'}
      variant={variant}
    >
      {isNode(children) ? <Resource subject={children} /> : children}
    </Typography>
  );
};
