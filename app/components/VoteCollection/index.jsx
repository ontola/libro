import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

const VoteCollection = props => (
  <Property
    label="hydra:member"
    groupBy={['http://schema.org/option', 'https://argu.co/ns/od#option']}
    limit={50}
    {...props}
  />
);

LinkedRenderStore.registerRenderer(
  VoteCollection,
  ['argu:VoteCollection', 'aod:CountCollection']
);

export default VoteCollection;
import './properties/member';
