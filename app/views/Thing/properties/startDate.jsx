import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const StartDate = ({ linkedProp }) => (
  <DetailDate startDate={new Date(linkedProp.value)} />
);

StartDate.type = NS.schema('Thing');

StartDate.property = NS.schema('startDate');

StartDate.topology = allTopologies;

StartDate.propTypes = propTypes;

export default register(StartDate);
