import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import HeaderWithMenu from '../../components/HeaderWithMenu';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { CardContent } from '../../topologies/Card';

const PhaseContainer = () => (
  <React.Fragment>
    {/* <HeaderWithMenu
      menu={<Property label={ontola.actionsMenu} />}
    > */}
    {/* <Property label={schema.name} /> */}
    <ContentDetails>
      <Property label={argu.time} />
    </ContentDetails>
    <CardContent>
      <Property label={schema.text} />
    </CardContent>
    {/* </HeaderWithMenu> */}
  </React.Fragment>
);

PhaseContainer.type = argu.Phase;

PhaseContainer.topology = containerTopology;

export default register(PhaseContainer);
