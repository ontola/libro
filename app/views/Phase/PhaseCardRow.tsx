import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import DetailsBar from '../../topologies/DetailsBar';

const PhaseCardRow: FC = () => (
  <React.Fragment>
    <DetailsBar right={<Property label={ontola.actionsMenu} />}>
      <Property label={rdfx.type} />
      <Property label={argu.time} />
    </DetailsBar>
    <CardContent>
      <Property label={schema.text} />
    </CardContent>
  </React.Fragment>
);

PhaseCardRow.type = argu.Phase;

PhaseCardRow.topology = cardRowTopology;

export default register(PhaseCardRow);
