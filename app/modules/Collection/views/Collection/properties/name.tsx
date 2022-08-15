import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import Link from '../../../../Common/components/Link';
import { pageTopology, parentTopology } from '../../../../Common/topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import { navbarTopology } from '../../../../NavBar/topologies';
import { tableRowTopology } from '../../../../Table/topologies';
import { CollectionTypes } from '../types';

interface CollectionNameProps {
  linkedProp: SomeTerm;
}

const CollectionName: FC<CollectionNameProps> = ({ linkedProp }) => {
  const [href] = useProperty(ontola.href);
  const Wrapper = React.useCallback(
    ({ children }) => {
      if (typeof href === 'undefined') {
        return (
          <div>
            {children}
          </div>
        );
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
  ...register(CollectionName),
  ...register(CollectionNameTableRow),
];
