import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import DetailDate from '../../../components/DetailDate';

const DateSubmitted = ({ linkedProp }: PropertyProps): JSX.Element => (
  <DetailDate dateSubmitted={linkedProp as Literal} />);

DateSubmitted.type = schema.Thing;

DateSubmitted.property = schema.ns('dateSubmitted');

DateSubmitted.topology = allTopologies;

export default register(DateSubmitted);
