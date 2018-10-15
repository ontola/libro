import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { isDifferentOrigin } from '../../../helpers/iris';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const IsPrimaryTopicOf = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  }
  const target = isDifferentOrigin(linkedProp) ? '_blank' : undefined;
  return (
    <a href={linkedProp.value} target={target}>External information</a>
  );
};

IsPrimaryTopicOf.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  IsPrimaryTopicOf,
  NS.schema('Thing'),
  NS.foaf('isPrimaryTopicOf'),
  allTopologies
);
