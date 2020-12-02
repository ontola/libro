import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <DetailDate dateCreated={linkedProp} />
);

DateCreated.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  DateCreated,
  schema.Thing,
  schema.dateCreated,
  allTopologies
);
