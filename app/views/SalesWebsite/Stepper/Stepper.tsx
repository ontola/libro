import { Grid } from '@material-ui/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import Step from '../../../components/SalesWebsite/Step';
import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies/Container';

const Stepper: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  return (
    <Grid
      container
      direction="column"
    >
      <Step
        name={name.value}
        text={text.value}
      />
    </Grid>

  );
};

Stepper.type = sales.Step;

Stepper.topology = containerTopology;

export default Stepper;
