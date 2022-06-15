import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../../ontology/ontola';
import sales from '../../ontology/sales';
import { chapterContentTopology, containerTopology } from '../../../../topologies';
import Step from '../../components/Step';

interface StepperContainerProps {
  count: number;
  sequenceIndex: number;
}

const StepperContainer: FC<StepperContainerProps> = ({ sequenceIndex, count }) => {
  const [name] = useProperty(schema.name);
  const [text] = useProperty(schema.text);
  const [href] = useProperty(ontola.href);
  const [trackingId] = useProperty(argu.trackingId);

  return (
    <Step
      first={sequenceIndex === 0}
      href={href?.value}
      last={sequenceIndex === count - 1}
      name={name.value}
      text={text.value}
      trackingId={trackingId?.value}
    />
  );
};

StepperContainer.type = sales.Step;

StepperContainer.topology = [
  containerTopology,
  chapterContentTopology,
];

export default StepperContainer;
