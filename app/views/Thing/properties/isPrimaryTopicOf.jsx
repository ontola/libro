import LinkedRenderStore, { isDifferentOrigin } from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
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

export default LinkedRenderStore.registerRenderer(
  IsPrimaryTopicOf,
  NS.schema('Thing'),
  NS.foaf('isPrimaryTopicOf')
);
