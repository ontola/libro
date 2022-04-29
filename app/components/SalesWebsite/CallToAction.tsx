import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SomeNode } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import { LibroTheme, Margin } from '../../themes/themes';

const TWO = 2;

const useStyles = makeStyles<LibroTheme, Partial<CallToActionProps>>((theme) => ({
  button: {
    fontSize: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: ({ imageUrl }) => `url(${imageUrl})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: theme.spacing(Margin.XL * TWO),
    paddingInline: theme.spacing(Margin.Small),
    width: '100%',
  },
  subtitle: {
    color: 'white',
    fontSize: 22,
    margin: 'auto',
    marginBottom: '3rem',
    maxWidth: '30rem',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: '2.1625rem',
    maxWidth: 900,
    textAlign: 'center',
  },
}));

export interface CallToActionProps {
  title: string,
  text: SomeNode,
  imageUrl: string,
}

/** Full page with a branded header */
export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  text,
  imageUrl,
  children,
}) => {
  const classes = useStyles({ imageUrl });

  return (
    <div className={classes.header}>
      <Typography
        className={classes.title}
        variant="h2"
      >
        {title}
      </Typography>
      <Resource subject={text} />
      {children}
    </div>
  );
};
