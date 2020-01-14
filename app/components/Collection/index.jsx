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

import { LoadingCard } from '../Loading';
import { entityIsLoaded } from '../../helpers/data';
import ontola from '../../ontology/ontola';

const Collection = ({
  display,
  label,
  pageSize,
  ...otherProps
}) => {
  const lrs = useLRS();
  const [baseCollection] = useProperty(label);
  useDataInvalidation({ subject: baseCollection });

  if (!baseCollection) {
    return null;
  }

  if (__CLIENT__ && !entityIsLoaded(lrs, baseCollection)) {
    lrs.queueEntity(baseCollection);

    return <LoadingCard />;
  }

  const iriTemplate = lrs.getResourceProperty(baseCollection, ontola.iriTemplate);

  const tmpl = parser.parse(iriTemplate.value);
  const collection = tmpl.expand({
    display,
    page_size: pageSize,
  });

  return (
    <Resource subject={rdf.namedNode(collection)} {...otherProps} />
  );
};

Collection.propTypes = {
  display: PropTypes.string,
  label: labelType,
  pageSize: PropTypes.number,
};

export default Collection;
