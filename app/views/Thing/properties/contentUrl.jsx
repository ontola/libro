import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const ContentUrl = ({ linkedProp }) => (
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

ContentUrl.propTypes = propTypes;

export default register(ContentUrl);
