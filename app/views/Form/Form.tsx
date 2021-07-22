import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { formFieldTopologies } from '../../components/FormField/FormField';
import form from '../../ontology/form';

const Form = () => (
  <Property label={form.pages} />
);

Form.type = form.Form;

Form.topology = formFieldTopologies;

export default register(Form);
