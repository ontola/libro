import { TableCell as MUITableCell, TableCellProps as MUITableCellProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import { headingCID } from '../../../Common/components/Heading';
import HeadingContext from '../../../Common/components/Heading/HeadingContext';
import { LibroTheme, Margin } from '../../../Kernel/lib/themes';
import { tableCellTopology } from '../index';

const useStyles = makeStyles((theme: LibroTheme) => ({
  noBorder: {
    borderBottom: 'none',
  },
  tableCell: {
    [`& .${headingCID}`]: {
      margin: 0,
      wordBreak: 'normal',
    },
    padding: `${theme.spacing(Margin.Small)} ${theme.spacing(Margin.Small)}`,
  },
}));

type TableCellProps = MUITableCellProps & {
  noBorder?: boolean;
  children?: ReactNode;
  colSpan?: number;
};
const TableCellTopology = createTopologyProvider(tableCellTopology);

const TableCell: TopologyFC<TableCellProps> = ({
  align,
  colSpan,
  children,
  noBorder,
}) => {
  const classes = useStyles();

  const className = clsx({
    [classes.tableCell]: true,
    [classes.noBorder]: noBorder,
  });

  return (
    <TableCellTopology>
      <HeadingContext>
        <MUITableCell
          align={align}
          className={className}
          colSpan={colSpan}
        >
          {children}
        </MUITableCell>
      </HeadingContext>
    </TableCellTopology>
  );
};

export default TableCell;
