import { Property, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { fullResourceTopology } from '../../../../topologies';
import MainBody from '../../../../topologies/MainBody';
import SubSection from '../../../Common/components/SubSection';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../Common/lib/metaData';

const NodeFull = () => (
  <React.Fragment>
    <MainBody>
      <Property label={NAME_PREDICATES} />
      <Property label={TEXT_PREDICATES} />
    </MainBody>
    <SubSection />
  </React.Fragment>
);

NodeFull.type = argu.GrantTreeNode;

NodeFull.topology = fullResourceTopology;

export default register(NodeFull);
