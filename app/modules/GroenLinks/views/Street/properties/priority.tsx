import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';
import Progress from '../../../../Common/components/Progress';
import { tryParseInt } from '../../../../Common/lib/numbers';
import teamGL from '../../../ontology/teamGL';

interface PriorityProps extends PropertyProps {
  endSpacing: boolean;
}

const Priority: FC<PriorityProps> = ({ endSpacing, linkedProp }) => {
  const value = tryParseInt(linkedProp);

  if (!value) {
    return null;
  }

  return (
    <Progress
      endSpacing={endSpacing}
      max={100}
      min={0}
      value={value}
    />
  );
};

Priority.type = [teamGL.Street, teamGL.PostalCode];

Priority.topology = allTopologies;

Priority.property = [teamGL.priority, teamGL.meanPriority];

export default register(Priority);
