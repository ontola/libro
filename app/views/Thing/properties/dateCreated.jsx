import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <DetailDate dateCreated={new Date(linkedProp.value)} />
);

DateCreated.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  DateCreated,
  schema.Thing,
  schema.dateCreated,
  allTopologies
);
