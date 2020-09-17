import { Resource } from 'link-redux';
import React from 'react';

import ll from '../../ontology/ll';

const LinkLoader = () => (
  <Resource subject={ll.loadingResource} />
);

export default LinkLoader;
