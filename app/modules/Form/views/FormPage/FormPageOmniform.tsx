import { Property, register } from 'link-redux';
import React from 'react';

import { omniformFieldsTopology } from '../../../Omniform/topologies/OmniformFields/OmniformFields';
import form from '../../ontology/form';

const FormPageOmniform = () => (
  <Property
    label={form.groups}
  />
);

FormPageOmniform.type = form.Page;

FormPageOmniform.topology = omniformFieldsTopology;

export default register(FormPageOmniform);
