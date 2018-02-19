import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => <DetailDate createdAt={new Date(linkedProp.value)} />;

DateCreated.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  DateCreated,
  NS.schema('Thing'),
  NS.schema('dateCreated'),
  allTopologies
);
