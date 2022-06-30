import { Resource, useLRS } from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../../../Collection/components/CollectionContext';
import { entityIsLoaded } from '../../../Core/lib/data';
import TableHeaderCell from '../../topologies/TableHeaderCell';

const TableHeadCells = (): JSX.Element => {
  const lrs = useLRS();
  const {
    columns,
    sortOptions,
  } = useCollectionOptions();

  return (
    <React.Fragment>
      {columns?.map((property) => {
        if (!entityIsLoaded(lrs, property)) {
          return <TableHeaderCell />;
        }

        return (
          <Resource
            forceRender
            key={property.value}
            sortOptions={sortOptions.filter((option) => option.item === property)}
            subject={property}
          />
        );
      })}
    </React.Fragment>
  );
};

export default TableHeadCells;
