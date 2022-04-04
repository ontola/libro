import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import {
  allTopologiesExcept,
  formFooterTopology,
  omniformFieldsTopology,
} from '../../topologies';

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
