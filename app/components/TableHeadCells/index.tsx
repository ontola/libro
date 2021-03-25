import { NamedNode } from '@ontologies/core';
import { Resource, useLRS } from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import { SortOptions } from '../../hooks/useSorting';
import TableHeaderCell from '../../topologies/TableHeaderCell';

export interface TableHeadCellsProps {
  columns: NamedNode[],
  setCurrentPage: (newPage: NamedNode) => void,
  sortOptions: SortOptions[],
}

const TableHeadCells = ({
  columns,
  setCurrentPage,
  sortOptions,
}: TableHeadCellsProps): JSX.Element => {
  const lrs = useLRS();

  return (
    <React.Fragment>
      {columns.map((property) => {
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
      })}
    </React.Fragment>
  );
};

export default TableHeadCells;
