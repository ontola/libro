import { Property, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { allTopologiesExcept, formFooterTopology } from '../../topologies';

import FormGroupProvider from './FormGroupProvider';

const FooterGroup = () => (
  <Property
    label={form.fields}
  />
);

const WrappedFooterGroup = ({ sequenceIndex, ...props }: {sequenceIndex: number}) => (
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
  register(WrappedFooterGroup),
  register(HiddenFooterGroup),
];
