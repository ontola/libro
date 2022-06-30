import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Core/ontology/ontola';
import argu from '../../lib/argu';

const PhaseContainer: FC = () => (
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
