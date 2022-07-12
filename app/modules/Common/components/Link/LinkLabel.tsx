import { makeStyles } from '@mui/styles';
import React, { ChildrenProp } from 'react';

export const linkActiveCID = 'CID-LinkActive';

const useStyles = makeStyles({
  linkLabel: {
    [`.${linkActiveCID} &`]: {
      '&::after': {
        backgroundColor: 'var(--accent-background-color)',
        bottom: '-.3em',
        color: 'var(--accent-color)',
        content: '""',
        height: '.3em',
        left: 0,
        position: 'absolute',
        right: 0,
      },
      color: 'var(--accent-background-color)',
      position: 'relative',
    },
  },
});

const LinkLabel: React.FC<ChildrenProp> = ({ children }) => {
  const classes = useStyles();

  return (
    <span className={classes.linkLabel}>
      {children}
    </span>
  );
};

export default LinkLabel;
