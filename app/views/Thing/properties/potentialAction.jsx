import PropTypes from 'prop-types';
import LinkedRenderStore from 'link-lib';
import { link, linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { filterSort } from '../../../helpers/data';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';

const propTypes = {
  potentialAction: PropTypes.arrayOf(linkedPropType),
};

const actionsBarBlacklist = [
  /new$/,
  /create$/,
  /edit$/,
  /update$/,
  /trash$/,
  /untrash$/,
  /delete$/,
  /destroy$/,
];

const order = [
  'create_vote',
  'destroy_vote',
  'create_comment',
  'destroy_comment',
];

const potentialAction = blacklist => ({ potentialActions, ...props }) => filterSort(
  potentialActions,
  blacklist,
  order
).map(iri => (
  <LinkedResourceContainer {...props} isPartOf={props.subject} key={iri} subject={iri} />
));

potentialAction.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    link({
      potentialActions: {
        label: NS.schema('potentialAction'),
        limit: Infinity,
      },
    })(potentialAction([])),
    [NS.schema('Thing'), NS.rdfs('Resource')],
    NS.schema('potentialAction'),
    allTopologiesExcept(NS.argu('actionsBar'))
  ),
  LinkedRenderStore.registerRenderer(
    link({
      potentialActions: {
        label: NS.schema('potentialAction'),
        limit: Infinity,
      },
    })(potentialAction(actionsBarBlacklist)),
    [NS.schema('Thing'), NS.rdfs('Resource')],
    NS.schema('potentialAction'),
    NS.argu('actionsBar')
  ),
];
