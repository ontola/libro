import { normalizeType } from 'link-lib';
import {
  Property,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../Collection/CollectionProvider';

const TableCells: React.FC = () => {
  const { columns } = useCollectionOptions();
  const { subject } = useLinkRenderContext();
  const lrs = useLRS();

  return (
    <React.Fragment>
      {columns.map((column) => {
        if (!lrs.getResourceProperty(subject, column)) {
          return (
            <td key={normalizeType(column)[0].value} />
          );
        }

        return (
          <Property
            forceRender
            key={normalizeType(column)[0].value}
            label={column}
          />
        );
      })}
    </React.Fragment>
  );
};

export default TableCells;
