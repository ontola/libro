import * as schema from '@ontologies/schema';
import { FC, useProperty } from 'link-redux';
import React from 'react';

import { chapterContentTopology } from '../../../Academy/topologies/ChapterContent';
import argu from '../../../Argu/lib/argu';
import { containerTopology } from '../../../Common/topologies/Container';
import ontola from '../../../Core/ontology/ontola';
import Step from '../../components/Step';
import sales from '../../ontology/sales';

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
