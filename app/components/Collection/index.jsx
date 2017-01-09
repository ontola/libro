import React from 'react';
import LinkedRenderStore from 'link-lib';
import { Property } from 'link-redux';

const Collection = () => (
  <div>
    <Property label="schema:name" />
    <Property label="http://www.w3.org/ns/hydra/core#member" />
  </div>
);

LinkedRenderStore.registerRenderer(Collection, 'http://www.w3.org/ns/hydra/core#Collection');

export { default as Member } from './properties/member';
export { default as Name } from './properties/name';
