import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Property,
  link,
  linkType,
  useDataInvalidation,
  useLinkRenderContext,
} from 'link-redux';
import React from 'react';

import { Columns } from '../../../components';
import argu from '../../../ontology/argu';
import Margin from '../../Margin/Margin';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';

const ArgumentColumns = () => (
  <Columns>
    <Property
      renderWhenEmpty
      direction="column"
      key="pro"
      label={argu.ns('proArguments')}
    />
    <Property
      renderWhenEmpty
      direction="column"
      key="con"
      label={argu.ns('conArguments')}
    />
  </Columns>
);

const Arguments = ({
  children,
  conArguments,
  proArguments,
}) => {
  const ctx = useLinkRenderContext();
  useDataInvalidation({
    dataSubjects: [conArguments, proArguments],
    subject: ctx.subject,
  });

  return children || <ArgumentColumns />;
};

Arguments.propTypes = {
  conArguments: linkType,
  proArguments: linkType,
};

const ArgumentsData = link({
  conArguments: argu.ns('conArguments'),
  proArguments: argu.ns('proArguments'),
})(Arguments);

const ArgumentsCardAppendix = (props) => (
  <ArgumentsData {...props}>
    <CardRow backdrop>
      <Margin />
      <ArgumentColumns />
    </CardRow>
  </ArgumentsData>
);

export default [
  LinkedRenderStore.registerRenderer(
    ArgumentsData,
    schema.Thing,
    argu.ns('arguments'),
    allTopologiesExcept(cardAppendixTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ArgumentsCardAppendix,
    schema.Thing,
    argu.ns('arguments'),
    cardAppendixTopology
  ),
];
