import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { DetailDate, LDLink } from '../../../components';
import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <LDLink>
    <DetailDate createdAt={new Date(linkedProp.value)} />
  </LDLink>
);

DateCreated.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  DateCreated,
  NS.schema('Thing'),
  NS.schema('dateCreated'),
  allTopologies
);
