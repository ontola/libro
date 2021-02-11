import { NamedNode } from '@ontologies/core';
import { Resource, useLRS } from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import TableHeaderCell from '../../topologies/TableHeaderCell';

interface SortOption {
  item: NamedNode;
}

export interface TableHeadCellsProps {
  columns: NamedNode[],
  setCurrentPage: (newPage: NamedNode) => null,
  sortOptions: SortOption[],
}

const TableHeadCells = ({
  columns,
  setCurrentPage,
  sortOptions,
}: TableHeadCellsProps): JSX.Element => {
  const lrs = useLRS();

  return columns.map((property) => {
    if (!entityIsLoaded(lrs, property)) {
      return <TableHeaderCell />;
    }

    return (
      <Resource
        forceRender
        key={property.value}
        setCurrentPage={setCurrentPage}
        sortOptions={sortOptions.filter((option) => option.item === property)}
        subject={property}
      />
    );
  });
};

export default TableHeadCells;
