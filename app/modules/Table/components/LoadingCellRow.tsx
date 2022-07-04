import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../Common/theme/types';
import { loadingBackground } from '../../Core/components/Loading';
import TableCell from '../topologies/TableCell';
import TableRow from '../topologies/TableRow';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  loadingBackground: loadingBackground(theme),
  loadingCellRow: {
    height: '1em',
  },
}));

export const LoadingCellRow = (): JSX.Element => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell colSpan={100}>
        <div
          className={clsx(
            classes.loadingCellRow,
            classes.loadingBackground,
          )}
        />
      </TableCell>
    </TableRow>
  );
};
