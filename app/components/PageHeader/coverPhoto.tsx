import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

export interface CoverPhotoProps {
  url: string;
  imagePositionY: string;
}

const useStyles = makeStyles<LibroTheme, CoverPhotoProps>((theme) => ({
  img: {
    [theme.breakpoints.down('md')]: {
      borderRadius: 'unset',
      height: '200px',
      marginLeft: '-0.5625rem',
      position: 'relative',
      width: '100vw',
    },
    backgroundColor: theme.palette.grey.xxLight,
    backgroundImage: ({ url }) => `url(${url})`,
    backgroundPositionY: ({ imagePositionY }) => `${imagePositionY}%`,
    backgroundRepeat: 'none',
    backgroundSize: 'cover',
    borderRadius: theme.shape.borderRadius,
    height: '300px',
    width: '100%',
  },
}));

export const CoverPhoto = (props: CoverPhotoProps): JSX.Element => {
  const classes = useStyles(props);

  return (
    <div
      className={classes.img}
      data-testid="CoverPhoto"
    />
  );
};
