import rdf, { isNamedNode, NamedNode } from '@ontologies/core';
import {
  Resource,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import parser from 'uri-template';

import { entityIsLoaded } from '../../helpers/data';
import ontola from '../../ontology/ontola';

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
  useDataInvalidation(isNamedNode(baseCollection) ? baseCollection : []);

  if (!isNamedNode(baseCollection)) {
    return null;
  }

  if (__CLIENT__ && !entityIsLoaded(lrs, baseCollection)) {
    return <Resource subject={baseCollection} onLoad={onLoad} />;
  }

  const iriTemplate = lrs.getResourceProperty(baseCollection, ontola.iriTemplate);

  if (!iriTemplate) {
    return null;
  }

  const tmpl = parser.parse(iriTemplate.value);
  const collection = tmpl.expand({
    display,
    page,
    page_size: pageSize,
    type,
  });

  return (
    <Resource subject={rdf.namedNode(collection)} {...otherProps} />
  );
};

export default Collection;
