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
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import Margin from '../../Margin/Margin';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';

function noArguments(conArgumentsCount, proArgumentsCount) {
  return (tryParseInt(conArgumentsCount) || 0) + (tryParseInt(proArgumentsCount) || 0) === 0;
}

const ArgumentColumns = () => (
  <Columns>
    <Property
      renderWhenEmpty
      direction="column"
      key="pro"
      label={NS.argu('proArguments')}
    />
    <Property
      renderWhenEmpty
      direction="column"
      key="con"
      label={NS.argu('conArguments')}
    />
  </Columns>
);

const Arguments = ({
  children,
  conArguments,
  conArgumentsCount,
  proArguments,
  proArgumentsCount,
}) => {
  const ctx = useLinkRenderContext();
  useDataInvalidation({
    dataSubjects: [conArguments, proArguments],
    subject: ctx.subject,
  });

  if (noArguments(conArgumentsCount, proArgumentsCount)) {
    return null;
  }

  return children || <ArgumentColumns />;
};

Arguments.propTypes = {
  conArguments: linkType,
  conArgumentsCount: linkType,
  proArguments: linkType,
  proArgumentsCount: linkType,
};

const ArgumentsData = link({
  conArguments: NS.argu('conArguments'),
  conArgumentsCount: NS.argu('conArgumentsCount'),
  proArguments: NS.argu('proArguments'),
  proArgumentsCount: NS.argu('proArgumentsCount'),
})(Arguments);

const ArgumentsCardAppendix = props => (
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
    NS.schema('Thing'),
    NS.argu('arguments'),
    allTopologiesExcept(cardAppendixTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ArgumentsCardAppendix,
    NS.schema('Thing'),
    NS.argu('arguments'),
    cardAppendixTopology
  ),
];
