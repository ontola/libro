import * as as from '@ontologies/as';
import LinkedRenderStore from 'link-lib';
import {
  linkedPropType,
  register,
  useProperty,
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
};

const CollectionName = ({ linkedProp }) => {
  const [href] = useProperty(ontola.href);
  const Wrapper = typeof href !== 'undefined' ? Link : 'div';

  return (
    <Wrapper to={href}>
      <Heading size="2">
        {linkedProp.value}
      </Heading>
    </Wrapper>
  );
};

CollectionName.type = CollectionTypes;

CollectionName.property = as.name;

CollectionName.topology = allTopologiesExcept(
  navbarTopology,
  parentTopology,
  tableRowTopology,
  pageTopology
);

CollectionName.propTypes = propTypes;

export default [
  register(CollectionName),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => linkedProp.value,
    CollectionTypes,
    as.name,
    tableRowTopology
  ),
];
