import { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import Collection from '../../../components/Collection';
import Columns from '../../../components/Columns';
import argu from '../../../ontology/argu';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { ListDirection } from '../../../topologies/List';
import { pageTopology } from '../../../topologies/Page';

export interface ArgumentsProps extends ArgumentColumnsProps{
  linkedProp: SomeTerm;
}

interface ArgumentColumnsProps {
  pageSize: number;
  subject: NamedNode;
}

const ArgumentColumns = ({
  pageSize,
  subject,
}: ArgumentColumnsProps): JSX.Element => (
  <Columns>
    <Collection
      renderWhenEmpty
      direction={ListDirection.Column}
      key="pro"
      label={argu.proArguments}
      pageSize={pageSize}
      to={subject}
    />
    <Collection
      renderWhenEmpty
      direction={ListDirection.Column}
      key="con"
      label={argu.conArguments}
      pageSize={pageSize}
      to={subject}
    />
  </Columns>
);

const Arguments: FC<ArgumentsProps> = (props) =>
  <ArgumentColumns {...props} />;

Arguments.type = schema.Thing;

Arguments.property = argu.arguments;

Arguments.topology = allTopologiesExcept(cardAppendixTopology, pageTopology);

const ArgumentsCardAppendix: FC<ArgumentsProps> = (props) => (
  <CardRow backdrop>
    <ArgumentColumns {...props} />
  </CardRow>
);

ArgumentsCardAppendix.type = schema.Thing;

ArgumentsCardAppendix.property = argu.arguments;

ArgumentsCardAppendix.topology = cardAppendixTopology;

export default [
  register(Arguments),
  register(ArgumentsCardAppendix),
];
