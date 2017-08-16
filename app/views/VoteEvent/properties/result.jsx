import React, { PropTypes } from 'react';

import { DetailStatus } from 'components';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

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
  NS.schema('Thing'),
  NS.schema('text')
);
