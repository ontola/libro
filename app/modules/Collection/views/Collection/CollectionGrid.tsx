import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import hydra from '../../../../ontology/hydra';
import CardContent from '../../../Common/components/Card/CardContent';
import LDLink from '../../../Common/components/LDLink';
import { gridTopology } from '../../../Common/topologies';
import { CardFixed } from '../../../Common/topologies/Card';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import List, { ListDirection } from '../../../Common/topologies/List';
import ontola from '../../../Kernel/ontology/ontola';

const CollectionGrid: FC = () => (
  <CardFixed>
    <LDLink>
      <CardContent endSpacing>
        <Property label={as.name} />
      </CardContent>
      <CardContent>
        <List
          overflow
          direction={ListDirection.Column}
        >
          <Property
            forceRender
            insideCollection
            label={ontola.pages}
          />
        </List>
      </CardContent>
    </LDLink>
    <DetailsBar>
      <Property label={as.totalItems} />
    </DetailsBar>
  </CardFixed>
);

CollectionGrid.type = [
  ontola.Collection,
  as.Collection,
  hydra.Collection,
];

CollectionGrid.topology = gridTopology;

export default register(CollectionGrid);
