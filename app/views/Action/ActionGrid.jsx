import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import GridHeader from '../../components/Grid/GridHeader';
import { gridTopology } from '../../topologies/Grid';
import Button from '../../components/Button';
import { footerTopology } from '../../topologies/Footer';

const ActionGrid = ({ name, subject }) => (
  <div>
    <GridHeader header={<Property label={schema.name} />}>
      <Property label={ontola.updateAction} onLoad={() => null} />
    </GridHeader>
    <Property label={schema.text} />
    <Button
      href={subject.value}
      title={name.value}
    >
      {name.value}
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

ActionGrid.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default register(ActionGrid);
