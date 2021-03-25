import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../components/Heading';
import Link from '../../../components/Link';
import ontola from '../../../ontology/ontola';
import { allTopologiesExcept } from '../../../topologies';
import { navbarTopology } from '../../../topologies/Navbar';
import { pageTopology } from '../../../topologies/Page';
import { parentTopology } from '../../../topologies/Parent';
import { tableRowTopology } from '../../../topologies/TableRow';
import { CollectionTypes } from '../types';

interface CollectionNameProps {
  linkedProp: SomeTerm;
}

const CollectionName: FC<CollectionNameProps> = ({ linkedProp }) => {
  const [href] = useProperty(ontola.href);
  const Wrapper = React.useCallback(
    ({ children }) => {
      if (typeof href === 'undefined') {
        return (<div>{children}</div>);
      }

      return (
        <Link to={href.value}>
          {children}
        </Link>
      );
    },
    [href],
  );

  return (
    <Wrapper>
      <Heading size={HeadingSize.LG}>
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
  pageTopology,
);

const CollectionNameTableRow: FC<CollectionNameProps> = ({ linkedProp }) => (
  <React.Fragment>
    {linkedProp.value}
  </React.Fragment>
);

CollectionNameTableRow.type = CollectionTypes;

CollectionNameTableRow.property = as.name;

CollectionNameTableRow.topology = tableRowTopology;

export default [
  register(CollectionName),
  register(CollectionNameTableRow),
];
