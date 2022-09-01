import { NamedNode, isNamedNode } from '@ontologies/core';
import {
  Resource,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { Params, useIRITemplate } from '../../Common/hooks/useIRITemplate';
import { entityIsLoaded } from '../../Kernel/lib/data';
import { CollectionSectionProps } from '../views/Collection/CollectionSection';

import { CollectionProps } from './CollectionProvider';

type Filter = Record<string, string>;

export interface CollectionComponentProps extends Partial<CollectionProps & CollectionSectionProps> {
  display?: string;
  filter?: Filter;
  label: NamedNode;
  onLoad?: () => null;
  page?: number;
  pageSize?: number;
  type?: string;
}

const serializeFilter = (filter: Filter): string[] => (
  Object.keys(filter).map((key) => (
    `${encodeURIComponent(key)}=${filter[key]}`
  ))
);

const Collection: React.FC<CollectionComponentProps> = ({
  display,
  label,
  filter,
  page,
  pageSize,
  type,
  onLoad,
  ...otherProps
}) => {
  const lrs = useLRS();
  const [baseCollection] = useProperty(label);
  const timestamp = useDataInvalidation(isNamedNode(baseCollection) ? baseCollection : []);
  const iriTemplate = useIRITemplate(isNamedNode(baseCollection) ? baseCollection : undefined);
  const collection = React.useMemo(() => {
    const assignedOpts: Params = {};

    if (display) {
      assignedOpts.display = display;
    }

    if (filter) {
      assignedOpts['filter%5B%5D'] = serializeFilter(filter);
    }

    if (page) {
      assignedOpts.page = page.toString();
    }

    if (pageSize) {
      assignedOpts.page_size = pageSize.toString();
    }

    if (type) {
      assignedOpts.type = type;
    }

    return iriTemplate.set(assignedOpts);
  }, [timestamp, display, page, pageSize, type]);

  if (!isNamedNode(baseCollection)) {
    return null;
  }

  if (__CLIENT__ && !entityIsLoaded(lrs, baseCollection)) {
    return (
      <Resource
        subject={baseCollection}
        onLoad={onLoad}
      />
    );
  }

  if (!collection) {
    return null;
  }

  return (
    <Resource
      subject={collection}
      {...otherProps}
    />
  );
};

export default Collection;
