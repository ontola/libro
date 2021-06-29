import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ActionBody = () => (
  <Property label={form.pages} />
);

ActionBody.type = form.Form;

ActionBody.topology = allTopologies;

ActionBody.mapDataToProps = {
  pages: form.pages,
};

export default register(ActionBody);
