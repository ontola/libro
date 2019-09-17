import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <DetailDate datePublished={new Date(linkedProp.value)} />
);

DateCreated.type = NS.schema('Thing');

DateCreated.property = NS.schema('datePublished');

DateCreated.topology = allTopologies;

DateCreated.propTypes = propTypes;

export default register(DateCreated);
