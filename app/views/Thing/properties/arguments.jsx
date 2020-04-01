import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  link,
  linkType,
  subjectType,
  useDataInvalidation,
  useLinkRenderContext,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Collection from '../../../components/Collection';
import Columns from '../../../components/Columns';
import Margin from '../../Margin/Margin';
import argu from '../../../ontology/argu';
import { allTopologiesExcept } from '../../../topologies';
import { cardAppendixTopology } from '../../../topologies/Card/CardAppendix';
import CardRow from '../../../topologies/Card/CardRow';
import { pageTopology } from '../../../topologies/Page';

const ArgumentColumns = ({ pageSize, subject }) => (
  <Columns>
    <Collection
      renderWhenEmpty
      direction="column"
      key="pro"
      label={argu.proArguments}
      pageSize={pageSize}
      to={subject}
    />
    <Collection
      renderWhenEmpty
      direction="column"
      key="con"
      label={argu.conArguments}
      pageSize={pageSize}
      to={subject}
    />
  </Columns>
);

ArgumentColumns.propTypes = {
  pageSize: PropTypes.number,
  subject: subjectType,
};

const Arguments = ({
  children,
  conArguments,
  pageSize,
  proArguments,
  subject,
}) => {
  const ctx = useLinkRenderContext();
  useDataInvalidation([conArguments, proArguments, ctx.subject]);

  return children || <ArgumentColumns pageSize={pageSize} subject={subject} />;
};

Arguments.propTypes = {
  conArguments: linkType,
  pageSize: PropTypes.number,
  proArguments: linkType,
};

const ArgumentsData = link({
  conArguments: argu.conArguments,
  proArguments: argu.proArguments,
})(Arguments);

const ArgumentsCardAppendix = ({
  pageSize,
  subject,
  ...otherProps
}) => (
  <ArgumentsData {...otherProps}>
    <CardRow backdrop>
      <Margin />
      <ArgumentColumns pageSize={pageSize} subject={subject} />
    </CardRow>
  </ArgumentsData>
);

ArgumentsCardAppendix.propTypes = {
  pageSize: PropTypes.number,
  subject: subjectType,
};

export default [
  LinkedRenderStore.registerRenderer(
    ArgumentsData,
    schema.Thing,
    argu.arguments,
    allTopologiesExcept(cardAppendixTopology, pageTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ArgumentsCardAppendix,
    schema.Thing,
    argu.arguments,
    cardAppendixTopology
  ),
];
