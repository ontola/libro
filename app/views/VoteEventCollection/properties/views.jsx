import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  getLinkedObjectProperty,
  labelType,
  subjectType,
  withLinkCtx,
  lrsType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  label: labelType,
  lrs: lrsType,
  subject: subjectType,
};

/**
 * Renders the property that contains a 'VoteEventCollection'
 * @param {object} props comp props
 * @returns {object} The component
 */
const Views = (props) => {
  const prop = getLinkedObjectProperty(props.label, props.subject, props.lrs);
  if (!prop) {
    return null;
  }

  return (
    <LinkedResourceContainer
      subject={prop}
      topology={NS.argu('voteEvent')}
    />
  );
};

Views.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  withLinkCtx(Views),
  [NS.argu('VoteEvent'), NS.argu('VoteEvent'), NS.as('Collection'), NS.argu('Collection')],
  NS.argu('votes'),
  NS.argu('collection')
);

export default Views;
