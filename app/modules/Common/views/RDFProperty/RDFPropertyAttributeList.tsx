import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { inlineTopology } from '../../topologies';
import { attributeListTopology } from '../../topologies/AttributeList';

const RDFPropertyAttributeList = () => (
  <label>
    <Property label={[schema.name, rdfs.label]} />
  </label>
);

RDFPropertyAttributeList.type = rdfx.Property;

RDFPropertyAttributeList.topology = [attributeListTopology, inlineTopology];

export default register(RDFPropertyAttributeList);
