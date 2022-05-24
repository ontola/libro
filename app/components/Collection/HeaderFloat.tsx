import { Property, Resource } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';

import { useCollectionOptions } from './CollectionContext';
import CollectionCreateButton from './CollectionCreateButton';
import CollectionFilterToggle, { CollectionFilterProps } from './CollectionFilterToggle';

export const HeaderFloat = ({
  filterContainerRef,
}: CollectionFilterProps): JSX.Element => {
  const {
    hidePagination,
    originalCollection,
  } = useCollectionOptions();
  const renderPagination = !hidePagination;

  return (
    <span>
      {renderPagination && <CollectionFilterToggle filterContainerRef={filterContainerRef} />}
      {renderPagination && <Property label={ontola.sortOptions} />}
      <Resource subject={originalCollection}>
        <CollectionCreateButton />
      </Resource>
    </span>
  );
};
