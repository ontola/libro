import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologiesExcept } from '../../topologies';
import { fullResourceTopology } from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

const ActionBody = () => (
  <Property label={form.pages} />
);

ActionBody.type = form.Form;

ActionBody.topology = allTopologiesExcept(fullResourceTopology, pageTopology);

export default register(ActionBody);
