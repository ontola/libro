import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import GridHeader from '../../components/Grid/GridHeader';
import { gridTopology } from '../../topologies/Grid';

const ActionGrid = () => (
  <div>
    <GridHeader header={<Property label={schema.name} />}>
      <Property label={ontola.updateAction} onLoad={() => null} />
    </GridHeader>
    <Property label={schema.text} />
    <Property label={schema.target} />
  </div>
);

ActionGrid.type = schema.Action;

ActionGrid.topology = gridTopology;

export default register(ActionGrid);
