import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, link } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const propTypes = {
  type: PropTypes.instanceOf(Array),
};

const TypeDetail = ({ type }) => {
  let bestType;
  for (let i = 0; i < type.length; i++) {
    switch (type[i].term) {
      case 'Resource':
      case 'Document':
      case 'RDFDocument':
        if (!bestType) {
          bestType = type[i];
        }
        break;
      default:
        bestType = type[i];
        break;
    }
  }

  if (!bestType) {
    return null;
  }

  return (
    <LinkedResourceContainer subject={bestType} />
  );
};

TypeDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link([NS.rdf('type')], { limit: Infinity })(TypeDetail),
  NS.schema('Thing'),
  NS.rdf('type'),
  detailsBarTopology
);
