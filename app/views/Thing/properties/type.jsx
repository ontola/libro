import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { bestType } from '../../../helpers/data';

const propTypes = {
  type: PropTypes.instanceOf(Array),
};

const TypeDetail = ({ type }) => {
  const best = bestType(type);
  if (best === null) {
    return null;
  }

  return (
    <LinkedResourceContainer subject={best} onError={() => null} />
  );
};

TypeDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link({ type: rdfx.type }, { limit: Infinity })(TypeDetail),
  schema.Thing,
  rdfx.type,
  detailsBarTopology
);
