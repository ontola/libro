import { Property, register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../topologies';
import form from '../../ontology/form';
import { formFooterTopology } from '../../topologies';

import FormGroupProvider from './FormGroupProvider';

const FooterGroup = () => (
  <Property
    label={form.fields}
  />
);

const WrappedFooterGroup = ({ sequenceIndex, ...props }: { sequenceIndex: number }) => (
  <FormGroupProvider sequenceIndex={sequenceIndex}>
    <FooterGroup {...props} />
  </FormGroupProvider>
);

WrappedFooterGroup.type = form.FooterGroup;

WrappedFooterGroup.topology = formFooterTopology;

const HiddenFooterGroup = () => null;

HiddenFooterGroup.type = form.FooterGroup;

HiddenFooterGroup.topology = allTopologiesExcept(formFooterTopology);

export default [
  ...register(WrappedFooterGroup),
  ...register(HiddenFooterGroup),
];
