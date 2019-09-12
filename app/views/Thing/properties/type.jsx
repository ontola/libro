import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
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
  link([NS.rdf('type')], { limit: Infinity })(TypeDetail),
  NS.schema('Thing'),
  NS.rdf('type'),
  detailsBarTopology
);
