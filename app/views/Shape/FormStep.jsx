import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const FormStep = () => (
  <React.Fragment>
    <Property label={NS.sh('name')} />
    <Property label={NS.sh('description')} />
    <div><Property label={NS.schema('url')} /></div>
  </React.Fragment>
);

FormStep.type = NS.ontola('FormStep');

FormStep.topology = allTopologies;

export default register(FormStep);
