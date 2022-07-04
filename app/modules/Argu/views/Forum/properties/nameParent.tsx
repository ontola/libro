import { Literal } from '@ontologies/core';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import { parentTopology } from '../../../../Common/topologies/BreadcrumbsBar';
import argu from '../../../ontology/argu';

interface ForumNameParent {
  linkedProp: Literal;
}

const ForumNameParent: FC<ForumNameParent> = ({ linkedProp }) => (
  <span
    style={{
      color: 'var(--accent-background-color)',
    }}
  >
    {linkedProp.value}
  </span>
);

ForumNameParent.type = argu.ContainerNode;

ForumNameParent.property = [
  schema.name,
  rdfs.label,
  foaf.name,
];

ForumNameParent.topology = parentTopology;

export default register(ForumNameParent);
