import { term } from '@ontola/mash';
import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

import RDFPropertyAttributeList from './RDFPropertyAttributeList';

const RDFProperty = ({ name, subject }) => (
  <span>
    <Property label={schema.image} />
    {name ? name.value : term(subject)}
  </span>
);

RDFProperty.type = rdfx.Property;
RDFProperty.topology = allTopologiesExcept(attributeListTopology, tableHeaderRowTopology);
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
