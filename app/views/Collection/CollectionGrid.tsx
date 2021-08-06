import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import LDLink from '../../components/LDLink';
import ontola from '../../ontology/ontola';
import { CardFixed } from '../../topologies/Card';
import CardList, { CardListDirection } from '../../topologies/Card/CardList';
import DetailsBar from '../../topologies/DetailsBar';
import { gridTopology } from '../../topologies/Grid';

import { CollectionTypes } from './types';

const CollectionGrid: FC = () => (
  <CardFixed>
    <LDLink>
      <CardContent endSpacing>
        <Property label={as.name} />
      </CardContent>
      <CardContent>
        <CardList
          overflow
          direction={CardListDirection.Column}
        >
          <Property
            forceRender
            insideCollection
            label={ontola.pages}
          />
        </CardList>
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
