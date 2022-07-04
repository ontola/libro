import { SomeTerm } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import Detail from '../../../../Common/components/Detail';
import argu from '../../../ontology/argu';

export interface TimeProps {
  linkedProp: SomeTerm;
}

const Time: FC<TimeProps> = ({ linkedProp }) => (
  <Detail
    icon="clock-o"
    text={linkedProp.value}
    title={linkedProp.value}
  />
);

Time.type = argu.Phase;

Time.topology = allTopologies;

Time.property = argu.time;

export default register(Time);
