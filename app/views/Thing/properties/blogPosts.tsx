import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import Collection from '../../../components/Collection';
import argu from '../../../ontology/argu';
import { mainBodyTopology } from '../../../topologies';

const noLoading = () => null;

const BlogPosts = () => (
  <Collection
    hideHeader
    label={argu.blogPosts}
    pageSize={1}
    onLoad={noLoading}
  />
);

BlogPosts.type = schema.Thing;

BlogPosts.property = argu.blogPosts;

BlogPosts.topology = mainBodyTopology;

export default register(BlogPosts);
