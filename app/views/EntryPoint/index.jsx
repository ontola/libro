import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './properties/name';
import './properties/url';

const EntryPoint = () => (
  <Property label={NS.schema('url')} style={{ display: 'inherit' }}>
    <Property label={NS.schema('name')} style={{ display: 'inherit' }} />
  </Property>
);

export default [
  LinkedRenderStore.registerRenderer(
    EntryPoint,
    NS.schema('EntryPoint')
  ),
  LinkedRenderStore.registerRenderer(
    EntryPoint,
    NS.schema('EntryPoint'),
    RENDER_CLASS_NAME,
    NS.argu('collection')
  ),
];
