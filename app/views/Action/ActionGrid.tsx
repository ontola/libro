import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import GridHeader from '../../components/Grid/GridHeader';
import { gridTopology } from '../../topologies/Grid';
import Button from '../../components/Button';
import { footerTopology } from '../../topologies/Footer';

interface ActionGridProps {
  name?: Literal;
}

const ActionGrid: FC<ActionGridProps> = ({ name, subject }) => (
  <div>
    <GridHeader header={<Property label={schema.name} />}>
      <Property
        label={ontola.updateAction}
        onLoad={() => null}
      />
    </GridHeader>
    <Property label={schema.text} />
    <Button
      href={subject.value}
      title={name?.value}
    >
      {name?.value}
    </Button>
  </div>
);

ActionGrid.type = schema.Action;

ActionGrid.topology = [
  footerTopology,
  gridTopology,
];

ActionGrid.mapDataToProps = {
  name: schema.name,
};

export default register(ActionGrid);
