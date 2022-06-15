import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import {
  allTopologiesExcept,
  cardAppendixTopology,
  pageTopology,
  tabPaneTopology,
} from '../../../../../topologies';
import CardRow from '../../../../../topologies/Card/CardRow';
import Container from '../../../../../topologies/Container';
import ArgumentColumns from '../../../components/Arguments/ArgumentColumns';

const Arguments: FC<PropertyProps> = () =>
  <ArgumentColumns />;

Arguments.type = schema.Thing;

Arguments.property = argu.arguments;

Arguments.topology = allTopologiesExcept(cardAppendixTopology, pageTopology);

const ArgumentsCardAppendix: FC<PropertyProps> = () => (
  <CardRow backdrop>
    <ArgumentColumns omniform />
  </CardRow>
);

ArgumentsCardAppendix.type = schema.Thing;

ArgumentsCardAppendix.property = argu.arguments;

ArgumentsCardAppendix.topology = cardAppendixTopology;

const ArgumentsTabPane: FC<PropertyProps> = () => (
  <Container>
    <ArgumentColumns />
  </Container>
);

ArgumentsTabPane.type = schema.Thing;

ArgumentsTabPane.property = argu.arguments;

ArgumentsTabPane.topology = tabPaneTopology;

export default [
  register(Arguments),
  register(ArgumentsCardAppendix),
  register(ArgumentsTabPane),
];
