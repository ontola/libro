import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailStatus } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
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
