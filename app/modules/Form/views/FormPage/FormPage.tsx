import { Property, register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../topologies';
import { omniformFieldsTopology } from '../../../Omniform/topologies';
import form from '../../ontology/form';
import { formFooterTopology } from '../../topologies';

const FormPage = () => (
  <Property
    label={form.groups}
  />
);

FormPage.type = form.Page;

FormPage.topology = allTopologiesExcept(
  formFooterTopology,
  omniformFieldsTopology,
);

export default register(FormPage);
