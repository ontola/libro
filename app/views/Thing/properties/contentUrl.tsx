import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

const ContentUrl = ({ linkedProp }: PropertyProps): JSX.Element => (
  <a
    download
    href={linkedProp.value}
    rel="noopener noreferrer"
    target="_blank"
  >
    Download
  </a>
);

ContentUrl.type = schema.Thing;

ContentUrl.topology = allTopologies;

ContentUrl.property = schema.contentUrl;

export default register(ContentUrl);
