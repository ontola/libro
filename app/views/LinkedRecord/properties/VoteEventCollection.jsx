import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const VoteEventCollection = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={NS.argu('voteEventCollection')}
  />
);

VoteEventCollection.propTypes = propTypes;

const linkedRecordWrapper = (component) => {
  const wrapperComp = (props, ...args) => {
    if (props.linkedProp && props.linkedProp.startsWith('https://beta.argu.co/nl/tweedekamer')) {
      return (
        <LinkedResourceContainer
          subject={`${FRONTEND_URL}/lr?iri=${props.linkedProp}`}
          {...props}
        />
      );
    }
    return component(props, ...args);
  };
  wrapperComp.propTypes = propTypes;
  return wrapperComp;
};

LinkedRenderStore.registerRenderer(
  linkedRecordWrapper(VoteEventCollection),
  NS.argu('LinkedRecord'),
  NS.argu('VoteEventCollection'),
  allTopologies
);

export default VoteEventCollection;
