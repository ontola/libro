import { Variant } from '@material-ui/core/styles/createTypography';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface TypographyElementProps {
  children?: SomeNode;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify',
}

const useStyles = makeStyles<LibroTheme, TypographyElementProps>((theme) => ({
  body1: {
    marginLeft: ({ align }) => align === 'center' ? 'auto' : '0',
    marginRight: ({ align }) => align === 'center' ? 'auto' : '0',
    maxWidth: 'clamp(30ch, 100%, 90ch)',
  },
  h1: {
    fontSize: '2rem',
    marginTop: '3rem',
  },
  h2: {
    fontSize: '1.7rem',
    marginTop: '3rem',
  },
  h3: {
    fontSize: '1.4rem',
    marginTop: '3rem',
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
      <Resource subject={children} />
    </Typography>
  );
};
