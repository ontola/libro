import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import AllWithProperty from '../../components/AllWithProperty';
import elements from '../../ontology/elements';
import { allTopologies } from '../../topologies';

const Document: FC = () => (
  <AllWithProperty label={elements.children} />
);

Document.type = elements.Document;
Document.topology = allTopologies;

export default register(Document);
