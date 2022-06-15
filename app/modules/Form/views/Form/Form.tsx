import { Property, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formTopologies } from '../../../../topologies';

const Form = () => (
  <Property label={form.pages} />
);

Form.type = form.Form;

Form.topology = formTopologies;

export default register(Form);
