import { SomeTerm } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

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
