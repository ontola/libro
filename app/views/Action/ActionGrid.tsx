import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import GridHeader from '../../components/Grid/GridHeader';
import { gridTopology } from '../../topologies/Grid';
import Button from '../../components/Button';
import { footerTopology } from '../../topologies/Footer';
import { LoadingHidden } from '../../components/Loading';

const ActionGrid: FC = ({ subject }) => {
  const [name] = useProperty(schema.name);

  return(
    <div>
      <GridHeader header={<Property label={schema.name} />}>
        <Property
          label={ontola.updateAction}
          onLoad={LoadingHidden}
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
};

ActionGrid.type = schema.Action;

ActionGrid.topology = [
  footerTopology,
  gridTopology,
];

export default register(ActionGrid);
