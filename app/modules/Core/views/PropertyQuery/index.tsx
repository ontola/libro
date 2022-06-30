import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import {
  FC,
  Property,
  Resource,
  array,
  register,
  useBooleans,
  useGlobalIds,
  useIds,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';

const PropertyQuery: FC = () => {
  const properties = useGlobalIds(array(sh.path));
  const [targetNode] = useIds(sh.targetNode);
  const [forceRender] = useBooleans(ll.forceRender);

  const query = properties.slice().reverse().reduce(
    (child: JSX.Element | null, label: NamedNode) => {
      if (child) {
        return (
          <Property label={label}>
            {child}
          </Property>
        );
      }

      return (
        <Property
          forceRender={forceRender}
          label={label}
        />
      );
    },
    null,
  );

  return (
    <Resource subject={targetNode}>
      {query}
    </Resource>
  );
};

PropertyQuery.type = ontola.PropertyQuery;

PropertyQuery.topology = allTopologies;

export default [
  register(PropertyQuery),
];
