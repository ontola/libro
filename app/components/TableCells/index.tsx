import { normalizeType } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import Spinner from '../Spinner';

const TableCells = ({ columns }: { columns: any }) => {
  if (!Array.isArray(columns)) {
    return <Spinner loading />;
  }

  return columns.map((column) => (
    <Property
      forceRender
      key={normalizeType(column)[0].value}
      label={column}
    />
  ));
};

export default TableCells;
