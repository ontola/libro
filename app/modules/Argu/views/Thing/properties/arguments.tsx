import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import { cardAppendixTopology } from '../../../../Common/topologies/Card/CardAppendix';
import CardRow from '../../../../Common/topologies/Card/CardRow';
import Container from '../../../../Common/topologies/Container';
import { pageTopology } from '../../../../Common/topologies/Page';
import { tabPaneTopology } from '../../../../Common/topologies/TabPane';
import ArgumentColumns from '../../../components/Arguments/ArgumentColumns';
import argu from '../../../ontology/argu';

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
  ...register(Arguments),
  ...register(ArgumentsCardAppendix),
  ...register(ArgumentsTabPane),
];
