import {
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import Progress from '../../../../components/Progress';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';

const TargetProgress = () => {
  const [current] = useNumbers(teamGL.current);
  const [target] = useNumbers(teamGL.target);

  if (current === null || target === null) {
    return null;
  }

  return(
    <Progress
      progressLabel
      height="15px"
      max={target}
      min={0}
      value={current}
    />
  );
};

TargetProgress.type = teamGL.TargetProgress;

TargetProgress.topology = allTopologies;

export default register(TargetProgress);
