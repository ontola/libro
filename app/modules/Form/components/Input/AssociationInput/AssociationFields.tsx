import { Property } from 'link-redux';
import React from 'react';

import form from '../../../ontology/form';

const AssociationFields = (): JSX.Element => (
  <Property label={form.form}>
    <Property label={form.pages} />
  </Property>
);

export default AssociationFields;
