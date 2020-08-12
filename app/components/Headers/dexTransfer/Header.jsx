import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  header: {
    color: 'white',
  },
  root: {
    backgroundColor: 'purple',
  },
});

const DexTransferHeader = ({ templateOptions }) => {
  const primaryLine = templateOptions.get('primaryLine');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <p>{primaryLine}</p>
      </header>
    </div>
  );
};

DexTransferHeader.propTypes = {
  templateOptions: PropTypes.string,
};

export default DexTransferHeader;
