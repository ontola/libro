import { makeStyles } from '@mui/styles';
import React from 'react';

export interface ScrollContainerProps {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  scrollContainer: {
    overflow: 'auto',
  },
});

/** Makes its {children} scrollable if they overflow their parent's boundary */
const ScrollContainer = ({ children }: ScrollContainerProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.scrollContainer}>
      {children}
    </div>
  );
};

export default ScrollContainer;
