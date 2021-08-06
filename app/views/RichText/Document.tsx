import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import elements from '../../ontology/elements';
import { allTopologies } from '../../topologies';

const Document: FC = () => (
  <Property
    label={elements.children}
    limit={Infinity}
  />
);

Document.type = elements.Document;
Document.topology = allTopologies;

export default register(Document);
