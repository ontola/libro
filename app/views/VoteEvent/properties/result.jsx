import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';
import { DetailStatus } from 'components';

const propTypes = {
  linkedProp: PropTypes.object,
};

const Result = ({ linkedProp }) => (
  <DetailStatus
    status={linkedProp}
  />
);

Result.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Result,
  'http://schema.org/Thing',
  'http://schema.org/text'
);
