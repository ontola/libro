import { NamedNode } from 'link-lib/dist-types/rdf';
import { Resource, useLRS } from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import TableHeaderCell from '../../topologies/TableHeaderCell';

interface SortOption {
  item: NamedNode;
}

const TableHeadCells = ({
  columns,
  setCurrentPage,
  sortOptions,
}: {
  columns: NamedNode[],
  setCurrentPage: (newPage: NamedNode) => null,
  sortOptions: SortOption[],
}) => {
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
