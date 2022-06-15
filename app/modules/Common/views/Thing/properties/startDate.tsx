import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import DetailDate from '../../../components/DetailDate';

interface StartDateProps {
  linkedProp: Literal;
  relative: boolean;
}

const StartDate = ({ linkedProp, relative }: StartDateProps): JSX.Element => (
  <DetailDate
    relative={relative ?? true}
    startDate={linkedProp}
  />
);

StartDate.type = schema.Thing;

StartDate.property = schema.startDate;

StartDate.topology = allTopologies;

export default register(StartDate);
