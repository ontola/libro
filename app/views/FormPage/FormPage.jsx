import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import form from '../../ontology/form';
import { allTopologiesExcept } from '../../topologies';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

const FormPage = (childProps) => (
  <CardContent noStartSpacing>
    <Property
      childProps={childProps}
      label={form.groups}
    />
  </CardContent>
);

FormPage.type = form.Page;

FormPage.topology = allTopologiesExcept(
  formFooterTopology,
  omniformFieldsTopology
);

export default register(FormPage);
