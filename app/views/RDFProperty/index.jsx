import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { term } from '@rdfdev/iri';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';
import { pageTopology } from '../../topologies/Page';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

import RDFPropertyAttributeList from './RDFPropertyAttributeList';

const RDFProperty = ({ name, subject }) => (
  <span>
    <Property label={schema.image} />
    {name ? name.value : term(subject)}
  </span>
);

RDFProperty.type = rdfx.Property;

RDFProperty.topology = allTopologiesExcept(
  attributeListTopology,
  tableHeaderRowTopology,
  pageTopology
);

RDFProperty.mapDataToProps = {
  name: { label: [schema.name, rdfs.label] },
};

RDFProperty.propTypes = {
  name: linkType,
  subject: subjectType,
};

export default [
  register(RDFProperty),
  RDFPropertyAttributeList,
];
