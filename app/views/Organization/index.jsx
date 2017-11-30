import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import Name from './properties/name';

const OrganizationSidebarBlock = () => (
  <Property label={NS.argu('navigationsMenu')} topology={NS.argu('sidebar')} />
);

export default [
  LinkedRenderStore.registerRenderer(
    OrganizationSidebarBlock,
    [NS.schema('Organization'), NS.argu('Page')],
    RENDER_CLASS_NAME,
    NS.argu('sidebarBlock')
  ),
  Name
];
