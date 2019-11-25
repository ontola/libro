import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

const RDFPropertyAttributeList = () => (
  <label><Property label={[schema.name, rdfs.label]} /></label>
);

RDFPropertyAttributeList.type = rdfx.Property;

RDFPropertyAttributeList.mapDataToProps = {
  type: rdfx.type,
};

RDFPropertyAttributeList.topology = [attributeListTopology, inlineTopology];

export default register(RDFPropertyAttributeList);
