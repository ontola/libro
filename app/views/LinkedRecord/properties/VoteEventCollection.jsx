import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';

const propTypes = {
  linkedProp: linkedPropType,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const VoteEventCollection = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteEventCollection')}
  />
);

VoteEventCollection.propTypes = propTypes;

const linkedRecordWrapper = (component) => {
  const wrapperComp = (props, ...args) => {
    if (props.linkedProp && props.linkedProp.startsWith('https://beta.argu.co/nl/tweedekamer')) {
      return (
        <LinkedObjectContainer
          object={`${FRONTEND_URL}/lr?iri=${props.linkedProp}`}
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
  NS.argu('VoteEventCollection')
);

export default VoteEventCollection;
