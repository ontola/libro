import {
  linkType,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Progress from '../../../components/Progress';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const TargetProgress = () => {
  const [current] = useProperty(teamGL.current);
  const [target] = useProperty(teamGL.target);

  return(
    <Progress
      progressLabel
      height="15px"
      max={target.value}
      min={0}
      value={current.value}
    />
  );
};

TargetProgress.type = teamGL.TargetProgress;

TargetProgress.topology = allTopologies;

TargetProgress.propTypes = {
  current: linkType,
  target: linkType,
};

export default register(TargetProgress);
