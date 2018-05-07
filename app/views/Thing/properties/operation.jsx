import PropTypes from 'prop-types';
import LinkedRenderStore from 'link-lib';
import { link, linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  operation: PropTypes.arrayOf(linkedPropType),
};

const order = [
  'create_vote',
  'destroy_vote',
  'create_comment',
  'destroy_comment',
];

const Operation = ({ operation, ...props }) => operation
  .sort((a, b) => {
    const oA = order.findIndex(o => a.value.includes(o));
    const oB = order.findIndex(o => b.value.includes(o));

    if (oA === -1) return 1;
    if (oB === -1) return -1;
    if (oA < oB) return 0;
    if (oA > oB) return 1;
    return -1;
  }).map(iri => (
    <LinkedResourceContainer {...props} isPartOf={props.subject} key={iri} subject={iri} />
  ));

Operation.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  link({
    operation: {
      label: NS.hydra('operation'),
      limit: Infinity,
    }
  })(Operation),
  [NS.schema('Thing'), NS.rdfs('Resource')],
  NS.hydra('operation'),
  allTopologies
);
