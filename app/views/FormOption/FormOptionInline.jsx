import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../topologies/AttributeList';
import { inlineTopology } from '../../topologies/Inline';

const FormOptionInline = () => (
  <Property label={[NS.schema('name'), NS.rdfs('label')]} />
);

FormOptionInline.type = NS.ontola('FormOption');

FormOptionInline.mapDataToProps = {
  type: NS.rdf('type'),
};

FormOptionInline.topology = [attributeListTopology, inlineTopology];


export default register(FormOptionInline);
