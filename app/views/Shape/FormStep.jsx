import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { allTopologies } from '../../topologies';

const FormStep = () => (
  <React.Fragment>
    <Property label={[rdfs.label, sh.name]} />
    <Property label={sh.description} />
    <div><Property label={schema.url} /></div>
  </React.Fragment>
);

FormStep.type = NS.ontola('FormStep');

FormStep.topology = allTopologies;

export default register(FormStep);
