import * as schema from '@ontologies/schema';
import {
  FC,
  useProperty,
} from 'link-redux';
import React from 'react';

import Step from '../../../components/SalesWebsite/Step';
import sales from '../../../ontology/sales';
import { containerTopology } from '../../../topologies/Container';

interface StepperContainerProps {
  count: number;
  sequenceIndex: number;
}

const StepperContainer: FC<StepperContainerProps> = ({ sequenceIndex, count }) => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);

  return (
    <Step
      name={name.value}
      showLine={sequenceIndex < count - 1}
      text={text.value}
    />
  );
};

StepperContainer.type = sales.Step;

StepperContainer.topology = containerTopology;

export default StepperContainer;
