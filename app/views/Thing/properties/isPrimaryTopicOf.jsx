import { isDifferentOrigin } from 'link-lib';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const IsPrimaryTopicOf = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  }
  const target = isDifferentOrigin(linkedProp) ? '_blank' : undefined;
  return (
    <a href={linkedProp} target={target}>External information</a>
  );
};

IsPrimaryTopicOf.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  IsPrimaryTopicOf,
  NS.schema('Thing'),
  NS.foaf('isPrimaryTopicOf')
);

export default IsPrimaryTopicOf;
