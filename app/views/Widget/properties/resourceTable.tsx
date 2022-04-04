import { isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import {
  FC,
  PropertyProps,
  array,
  literal,
  register,
  useDataInvalidation,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies';
import { namePredicates } from '../../Thing/properties/name';

const NamePropMap = {
  name: literal(namePredicates),
};

const TargetPropMap = {
  target: sh.targetNode,
};

const ResourceTable: FC<PropertyProps> = () => {
  const widgetResources = useIds(array(ontola.widgetResource));
  const targetNodesMap = useResourceLinks(widgetResources, TargetPropMap);
  const targetNodes = targetNodesMap.map((map) => map.target);
  useDataInvalidation(targetNodes.filter(isNode));
  const nameSubjects = targetNodesMap.map((map) => map.target ?? map.subject);
  const nameMap = useResourceLinks(nameSubjects.filter(isNode), NamePropMap);
  const subjects = nameMap.map((map) => map.subject?.value).join(', ');
  const names = nameMap.map((map) => map.name).join(', ');

  return (
    <div title={subjects}>
      {names}
    </div>
  );
};

ResourceTable.type = ontola.Widget;

ResourceTable.property = argu.rawResource;

ResourceTable.topology = tableRowTopology;

export default register(ResourceTable);
