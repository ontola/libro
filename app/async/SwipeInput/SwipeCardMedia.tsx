import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface SwipeCardMediaProps {
  tutorial?: React.ReactNode;
  src: string | undefined,
}

const useStyles = makeStyles({
  media: {
    height: '100%',
    touchAction: 'none',
  },
  mediaWrapper: {
    contain: 'paint',
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
  },
});

export const SwipeCardMedia = ({
  tutorial,
  src,
  children,
}: React.PropsWithChildren<SwipeCardMediaProps>): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={classes.mediaWrapper}
    >
      {tutorial}
      <CardMedia
        className={classes.media}
        component="img"
        image={src}
      />
      {children}
    </div>
  );
};
