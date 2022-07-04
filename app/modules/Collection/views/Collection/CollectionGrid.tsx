import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import LDLink from '../../../Common/components/LDLink';
import { CardFixed } from '../../../Common/topologies/Card';
import DetailsBar from '../../../Common/topologies/DetailsBar';
import { gridTopology } from '../../../Common/topologies/Grid';
import List, { ListDirection } from '../../../Common/topologies/List';
import ontola from '../../../Kernel/ontology/ontola';

import { CollectionTypes } from './types';

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

CollectionGrid.type = CollectionTypes;

CollectionGrid.topology = gridTopology;

export default register(CollectionGrid);
