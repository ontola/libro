import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import {
  attributeListTopology,
  inlineTopology,
  tableCellTopology,
} from '../../topologies';

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
