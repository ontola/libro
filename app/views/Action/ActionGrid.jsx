import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import GridHeader from '../../components/Grid/GridHeader';
import { gridTopology } from '../../topologies/Grid';
import Button from '../../components/Button';

const ActionGrid = ({ name, target }) => (
  <div>
    <GridHeader header={<Property label={schema.name} />}>
      <Property label={ontola.updateAction} onLoad={() => null} />
    </GridHeader>
    <Property label={schema.text} />
    <Button
      href={target.value}
      title={name.value}
    >
      {name.value}
    </Button>
  </div>
);

ActionGrid.type = schema.Action;

ActionGrid.topology = gridTopology;

ActionGrid.mapDataToProps = {
  name: schema.name,
  target: schema.target,
};

ActionGrid.propTypes = {
  name: linkType,
  target: linkType,
};

export default register(ActionGrid);
