import { makeStyles } from '@material-ui/styles';
import React from 'react';

export interface PageHeaderImageProps {
  alt: string;
  src: string;
}

const useStyles = makeStyles({
  pageHeaderCircle: {
    borderRadius: '999px',
    flexShrink: 0,
    height: '4rem',
    marginBottom: '1em',
    marginRight: '1rem',
    overflow: 'hidden',
    width: '4rem',
  },
});

const PageHeaderImage = ({ alt, src }: PageHeaderImageProps): JSX.Element => {
  const classes = useStyles();

  return (
    <img
      alt={alt}
      className={classes.pageHeaderCircle}
      src={src}
    />
  );
};

export default PageHeaderImage;
