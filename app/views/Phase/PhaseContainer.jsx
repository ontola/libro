import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';

const PhaseContainer = () => (
  <Card>
    <CardContent>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={schema.name} />
      </HeaderWithMenu>
      <ContentDetails>
        <Property label={argu.time} />
      </ContentDetails>
      <Property label={schema.text} />
    </CardContent>
  </Card>
);

PhaseContainer.type = argu.Phase;

PhaseContainer.topology = containerTopology;

export default register(PhaseContainer);
