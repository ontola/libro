import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';
import elements from '../ontology/elements';

const Document: FC = () => (
  <Property label={elements.children} />
);

Document.type = elements.Document;
Document.topology = allTopologies;

export default register(Document);
