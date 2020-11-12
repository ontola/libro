import { normalizeType } from 'link-lib';
import { Property, useLinkRenderContext, useLRS } from 'link-redux';
import React from 'react';
import TableCell from '../../topologies/TableCell';

import Spinner from '../Spinner';

const TableCells = ({ columns }: { columns: any }) => {
  const { subject } = useLinkRenderContext();
  const lrs = useLRS();

  if (!Array.isArray(columns)) {
    return <Spinner loading />;
  }

  return columns.map((column) => {
    if (!lrs.getResourceProperty(subject, column)) {
      return <TableCell />;
    }

    return (
      <Property
        forceRender
        key={normalizeType(column)[0].value}
        label={column}
      />
    );
  });
};

export default TableCells;
