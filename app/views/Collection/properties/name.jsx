import as from '@ontologies/as';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  subjectType,
  useLRS,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import Link from '../../../components/Link';
import Heading from '../../../components/Heading';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { CollectionTypes } from '../types';
import { navbarTopology } from '../../../topologies/Navbar';
import { pageTopology } from '../../../topologies/Page';
import { parentTopology } from '../../../topologies/Parent';
import { tableRowTopology } from '../../../topologies/TableRow';

const propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

const CollectionName = ({ linkedProp, subject }) => {
  const lrs = useLRS();
  const href = lrs.getResourceProperty(subject, ontola.href);
  const Wrapper = typeof href !== 'undefined' ? Link : 'div';

  return (
    <Wrapper to={href}>
      <Heading size="2">
        {linkedProp.value}
      </Heading>
    </Wrapper>
  );
};

CollectionName.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    withLinkCtx(CollectionName),
    CollectionTypes,
    as.name,
    allTopologiesExcept(navbarTopology, parentTopology, tableRowTopology, pageTopology)
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => linkedProp.value,
    CollectionTypes,
    as.name,
    tableRowTopology
  ),
];
