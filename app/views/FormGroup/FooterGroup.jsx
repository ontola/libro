import { Property, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologiesExcept } from '../../topologies';
import { formFooterTopology } from '../../topologies/FormFooter/Footer';

const FooterGroup = (childProps) => (
  <Property
    childProps={childProps}
    label={form.fields}
  />
);

FooterGroup.type = form.FooterGroup;

FooterGroup.topology = formFooterTopology;

const HiddenFooterGroup = () => null;

HiddenFooterGroup.type = form.FooterGroup;

HiddenFooterGroup.topology = allTopologiesExcept(formFooterTopology);

export default [
  register(FooterGroup),
  register(HiddenFooterGroup),
];
