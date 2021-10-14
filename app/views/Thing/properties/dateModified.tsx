import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const DateModified = ({ linkedProp }: PropertyProps): JSX.Element => (
  <DetailDate dateCreated={linkedProp as Literal} />
);

DateModified.type = schema.Thing;

DateModified.topology = allTopologies;

DateModified.property = schema.dateModified;

export default register(DateModified);
