import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import {
  allTopologiesExcept,
  attributeListTopology,
  pageTopology,
  tableHeaderRowTopology,
} from '../../../../topologies';

import RDFPropertyAttributeList from './RDFPropertyAttributeList';

const RDFProperty: FC = ({ subject }) => {
  const [name] = useProperty([schema.name, rdfs.label]);

  return(
    <span>
      <Property label={schema.image} />
      {name ? name.value : term(subject as NamedNode)}
    </span>
  );
};

RDFProperty.type = rdfx.Property;

RDFProperty.topology = allTopologiesExcept(
  attributeListTopology,
  tableHeaderRowTopology,
  pageTopology,
);

export default [
  register(RDFProperty),
  RDFPropertyAttributeList,
];