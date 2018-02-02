import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailStatus } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Result = ({ linkedProp }) => (
  <DetailStatus
    status={linkedProp.value}
  />
);

Result.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Result,
  NS.schema('Thing'),
  NS.schema('text')
);
