import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import { gridTopology } from '../../../../topologies';
import { CardFixed } from '../../../../topologies/Card';
import DetailsBar from '../../../../topologies/DetailsBar';
import List, { ListDirection } from '../../../../topologies/List';
import CardContent from '../../../Common/components/Card/CardContent';
import LDLink from '../../../Common/components/LDLink';

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
