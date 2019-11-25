import rdfx from '@ontologies/rdf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

const FormOptionInline = () => (
  <Property label={[schema.name, rdfs.label]} />
);

FormOptionInline.type = ontola.FormOption;

FormOptionInline.mapDataToProps = {
  type: rdfx.type,
};

FormOptionInline.topology = [attributeListTopology, inlineTopology];


export default register(FormOptionInline);
