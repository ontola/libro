import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../../../ontology/ontola';
import { containerTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';

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
