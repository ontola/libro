import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Detail } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const LocationDetail = ({ linkedProp }) => (
  <Detail
    icon="map-marker"
    text={linkedProp.value}
  />
);

LocationDetail.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  LocationDetail,
  NS.schema('Thing'),
  NS.schema('location'),
  NS.argu('detail')
);
