import { Property, register } from 'link-redux';
import React from 'react';

import SubSection from '../../../Common/components/SubSection';
import { NAME_PREDICATES, TEXT_PREDICATES } from '../../../Common/lib/metaData';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import MainBody from '../../../Common/topologies/MainBody';
import argu from '../../ontology/argu';

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
