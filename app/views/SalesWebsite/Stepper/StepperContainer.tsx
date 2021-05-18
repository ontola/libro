import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import Step from '../../../components/SalesWebsite/Step';
import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies/Container';

const StepperContainer: FC = () => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  return (
    <Step
      name={name.value}
      text={text.value}
    />
  );
};

StepperContainer.type = sales.Step;

StepperContainer.topology = containerTopology;

export default StepperContainer;