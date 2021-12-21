import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  pageHeaderMenuItems: {
    alignItems: 'flex-end',
    color: theme.palette.grey.main,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '2em',
  },
}));

const PageHeaderMenuItems: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeaderMenuItems}>
      {children}
    </div>
  );
};

PageHeaderMenuItems.propTypes = {
  children: PropTypes.node,
};

export default PageHeaderMenuItems;
