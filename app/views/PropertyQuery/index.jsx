import * as sh from '@ontologies/shacl';
import {
  Property,
  Resource,
  register,
  subjectType,
  useLRS,
} from 'link-redux';
import React from 'react';

import { seqToArr } from '../../helpers/data';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

const PropertyQuery = ({
  path,
  targetNode,
}) => {
  const lrs = useLRS();
  const properties = seqToArr(lrs, [], path).reverse();
  const query = properties.reduce(
    (child, label) => {
      if (child) {
        return (
          <Property label={label}>
            {child}
          </Property>
        );
      }

      return <Property label={label} />;
    }, null
  );

  return (
    <Resource subject={targetNode}>
      {query}
    </Resource>
  );
};

PropertyQuery.type = ontola.PropertyQuery;

PropertyQuery.topology = allTopologies;

PropertyQuery.mapDataToProps = {
  path: sh.path,
  targetNode: sh.targetNode,
};

PropertyQuery.propTypes = {
  path: subjectType,
  targetNode: subjectType,
};

export default [
  register(PropertyQuery),
];
