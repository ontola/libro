import MUITableHead from '@mui/material/TableHead';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../modules/Argu/ontology/argu';
import { LibroTheme } from '../../themes/themes';
import { TopologyFC } from '../Topology';

export type TableHeadProps = React.HTMLAttributes<HTMLElement>;

export const tableHeadTopology = argu.ns('tableHead');

const useStyles = makeStyles<LibroTheme>((theme: LibroTheme) => ({
  tableHead: {
    '& button': {
      color: 'inherit',
      cursor: 'pointer',
      font: 'inherit',
    },
    '& tr > th': {
      '&:first-child': {
        borderTopLeftRadius: theme.shape.borderRadius,
      },
      '&:last-child': {
        borderTopRightRadius: theme.shape.borderRadius,
      },
      backgroundColor: theme.palette.grey.xxLight,
    },
    borderBottom: theme.greyBorder,
    color: theme.palette.grey.midDark,
  },
}));

const TableHead: TopologyFC<TableHeadProps> = ({ children, className, ...attr }) => {
  const [TableHeadTopology] = useTopologyProvider(tableHeadTopology);
  const classes = useStyles();

  return (
    <TableHeadTopology>
      <MUITableHead
        className={clsx(classes.tableHead, className)}
        {...attr}
      >
        {children}
      </MUITableHead>
    </TableHeadTopology>
  );
};

export default TableHead;
