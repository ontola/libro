import LinkedRenderStore from 'link-lib';
import {
  LinkedObjectContainer,
  getLinkedObjectProperty,
  labelType,
  lowLevel,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

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
