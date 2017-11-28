import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './NavBarContent.scss';
import './properties/name';

const OrganizationSidebarBlock = () => (
  <Property label={NS.argu('navigationsMenu')} topology={NS.argu('sidebar')} />
);

LinkedRenderStore.registerRenderer(
  OrganizationSidebarBlock,
  [NS.schema('Organization'), NS.argu('Page')],
  RENDER_CLASS_NAME,
  NS.argu('sidebarBlock')
);

export default OrganizationSidebarBlock;
