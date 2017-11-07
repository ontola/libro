import {
  getLinkedObjectProperty,
  LinkedObjectContainer,
  lowLevel,
  labelType,
  subjectType,
} from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: labelType,
  subject: subjectType,
};

/**
 * Renders the property that contains a 'VoteEventCollection'
 * @param {object} props comp props
 * @returns {object} The component
 */
const Views = (props, { linkedRenderStore }) => {
  const prop = getLinkedObjectProperty(props.label, props.subject, linkedRenderStore);
  if (!prop) {
    return null;
  }

  return (
    <LinkedObjectContainer
      object={prop}
      topology={NS.argu('voteEvent')}
    />
  );
};

Views.contextTypes = {
  linkedRenderStore: PropTypes.object,
  topology: PropTypes.string,
};
Views.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  lowLevel.linkedSubject(lowLevel.linkedVersion(Views)),
  [NS.argu('VoteEvent'), NS.argu('VoteEvent'), NS.argu('Collection')],
  NS.argu('votes'),
  NS.argu('collection')
);

export default Views;
