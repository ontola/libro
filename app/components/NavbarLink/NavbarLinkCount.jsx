import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import CountBubble from '../CountBubble';

const propTypes = {
  count: PropTypes.number,
};

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

const NavbarLinkCount = ({ count }) => {
  const classes = useStyles();
  if (!(count > 0)) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <CountBubble count={count} />
    </div>
  );
};

NavbarLinkCount.propTypes = propTypes;

export default NavbarLinkCount;
