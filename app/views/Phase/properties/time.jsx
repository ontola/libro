import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Detail from '../../../components/Detail';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';


const Time = ({ linkedProp }) => (
  <Detail
    text={linkedProp.value}
    title={linkedProp.value}
  />
);

Time.type = argu.Phase;

Time.topology = allTopologies;

Time.property = argu.time;

Time.propTypes = {
  linkedProp: linkedPropType,
};

export default register(Time);
