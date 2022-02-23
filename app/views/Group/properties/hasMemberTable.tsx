import * as as from '@ontologies/as';
import { isNode } from '@ontologies/core';
import {
  FC,
  PropertyProps,
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import org from '../../../ontology/org';
import { tableRowTopology } from '../../../topologies/TableRow';

const HasMemberTable: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const [totalItems] = useNumbers(isNode(linkedProp) ? linkedProp : undefined, as.totalItems);

  return (
    <React.Fragment>
      {totalItems}
    </React.Fragment>
  );
};

HasMemberTable.type = argu.Group;

HasMemberTable.property = org.hasMember;

HasMemberTable.topology = tableRowTopology;

export default register(HasMemberTable);
