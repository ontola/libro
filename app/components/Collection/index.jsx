import rdf from '@ontologies/core';
import {
  Resource,
  labelType,
  useDataInvalidation,
  useLRS,
  useProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import parser from 'uri-template';

import { entityIsLoaded } from '../../helpers/data';
import ontola from '../../ontology/ontola';

const Collection = ({
  display,
  label,
  page,
  pageSize,
  type,
  ...otherProps
}) => {
  const lrs = useLRS();
  const [baseCollection] = useProperty(label);
  useDataInvalidation({ subject: baseCollection });

  if (!baseCollection) {
    return null;
  }

  if (__CLIENT__ && !entityIsLoaded(lrs, baseCollection)) {
    return <Resource subject={baseCollection} />;
  }

  const iriTemplate = lrs.getResourceProperty(baseCollection, ontola.iriTemplate);

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

Collection.propTypes = {
  display: PropTypes.string,
  label: labelType,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  type: PropTypes.string,
};

export default Collection;
