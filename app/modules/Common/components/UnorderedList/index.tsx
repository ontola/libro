import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../theme/types';
import { linkActiveCID } from '../Link/LinkLabel';

export interface UnorderedListProps {
  children: React.ReactNode;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  unorderedList: {
    '.Modal > div > div >.Container > &, .Modal > div > &': {
      color: theme.palette.common.white,
    },
    [`& .${linkActiveCID}`]: {
      fontWeight: 'bold',
    },
  },
}));

const UnorderedList = ({ children }: UnorderedListProps): JSX.Element => {
  const classes = useStyles();

  return (
    <ul className={classes.unorderedList}>
      {children}
    </ul>
  );
};

export default UnorderedList;
