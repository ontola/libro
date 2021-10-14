import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const DateCreated = ({ linkedProp }: PropertyProps): JSX.Element => (
  <DetailDate datePublished={linkedProp as Literal} />
);

DateCreated.type = schema.Thing;

DateCreated.property = schema.datePublished;

DateCreated.topology = allTopologies;

export default register(DateCreated);
