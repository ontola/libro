import React from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';

const propTypes = {
  linkedProp: linkedPropVal,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const VoteEventCollection = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteEventCollection"
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
  'argu:LinkedRecord',
  'argu:VoteEventCollection'
);

export default VoteEventCollection;
