import { NamedNode, isNamedNode } from '@ontologies/core';
import {
  Resource,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import { Params, useIRITemplate } from '../../hooks/useIRITemplate';

interface PropTypes {
  display?: string;
  label: NamedNode;
  onLoad?: () => null;
  page?: number;
  pageSize?: number;
  type?: string;
}

const Collection: React.FC<PropTypes> = ({
  display,
  label,
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
    return <Resource subject={baseCollection} onLoad={onLoad} />;
  }

  if (!collection) {
    return null;
  }

  return (
    <Resource subject={collection} {...otherProps} />
  );
};

export default Collection;
