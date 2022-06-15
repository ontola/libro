import { Property, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { omniformFieldsTopology } from '../../../../topologies';

const FormPageOmniform = () => (
  <Property
    label={form.groups}
  />
);

FormPageOmniform.type = form.Page;

FormPageOmniform.topology = omniformFieldsTopology;

export default register(FormPageOmniform);
