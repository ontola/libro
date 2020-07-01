import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

const FormPageFooter = (childProps) => (
  <Property
    {...childProps}
    label={form.footerGroup}
  />
);

FormPageFooter.type = form.Page;

FormPageFooter.topology = formFooterTopology;

export default register(FormPageFooter);
