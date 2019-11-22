import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

const RDFPropertyAttributeList = () => (
  <label><Property label={[NS.schema('name'), NS.rdfs('label')]} /></label>
);

RDFPropertyAttributeList.type = NS.rdf('Property');

RDFPropertyAttributeList.mapDataToProps = {
  type: NS.rdf('type'),
};

RDFPropertyAttributeList.topology = [attributeListTopology, inlineTopology];

export default register(RDFPropertyAttributeList);
