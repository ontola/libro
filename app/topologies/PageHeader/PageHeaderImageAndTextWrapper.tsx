import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  pageHeaderImageAndTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const PageHeaderMenuItems: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderImageAndTextWrapper}>
      {children}
    </div>
  );
};

PageHeaderMenuItems.propTypes = {
  children: PropTypes.node,
};

export default PageHeaderMenuItems;
