import { NamedNode, isNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import {
  FC,
  PropertyProps,
  literal,
  register,
  useDataInvalidation,
  useProperty,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import { useSeqToArr } from '../../../hooks/useSeqToArr';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies/TableRow';
import { namePredicates } from '../../Thing/properties/name';

const NamePropMap = {
  name: literal(namePredicates),
};

const TargetPropMap = {
  target: sh.targetNode,
};

const ResourceTable: FC<PropertyProps> = () => {
  const [resourceSeq] = useProperty(ontola.widgetResource) as NamedNode[];
  const [widgetResources] = useSeqToArr(resourceSeq);
  const targetNodesMap = useResourceLinks(widgetResources.filter(isNode), TargetPropMap);
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
