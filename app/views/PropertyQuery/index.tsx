import { NamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import {
  FC,
  Property,
  Resource,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { seqToArr } from '../../helpers/data';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const PropertyQuery: FC = () => {
  const [path] = useProperty(sh.path) as NamedNode[];
  const [targetNode] = useProperty(sh.targetNode);

  const lrs = useLRS();
  const properties = seqToArr(lrs, [], path).reverse();
  const query = properties.reduce(
    (child: JSX.Element | null, label: NamedNode) => {
      if (child) {
        return (
          <Property label={label}>
            {child}
          </Property>
        );
      }

      return <Property label={label} />;
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
