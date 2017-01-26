import { isDifferentOrigin } from 'link-lib';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

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
  'http://schema.org/Thing',
  'http://xmlns.com/foaf/0.1/isPrimaryTopicOf'
);

export default IsPrimaryTopicOf;
