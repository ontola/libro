import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

const FormPageOmniform = (childProps) => (
  <Property
    childProps={childProps}
    label={form.groups}
  />
);

FormPageOmniform.type = form.Page;

FormPageOmniform.topology = omniformFieldsTopology;

export default register(FormPageOmniform);
