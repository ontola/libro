import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { inlineTopology } from '../../../Common/topologies';
import { attributeListTopology } from '../../../Common/topologies/AttributeList';
import ontola from '../../../Kernel/ontology/ontola';
import { tableCellTopology } from '../../../Table/topologies/TableCell';

const FormOptionInline = (): JSX.Element => (
  <Property label={[schema.name, rdfs.label]} />
);

FormOptionInline.type = ontola.FormOption;

FormOptionInline.topology = [
  attributeListTopology,
  inlineTopology,
  tableCellTopology,
];

export default register(FormOptionInline);
