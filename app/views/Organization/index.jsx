import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, Property, LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import Name from './properties/name';

const OrganizationSidebarProps = {
  navigationsMenu: linkedPropType,
};

const OrganizationSidebar = ({ navigationsMenu }) => (
  <LinkedResourceContainer subject={navigationsMenu} >
    <Property label={NS.argu('menuItems')} />
  </LinkedResourceContainer>
);

OrganizationSidebar.propTypes = OrganizationSidebarProps;

export default [
  LinkedRenderStore.registerRenderer(
    link([NS.argu('navigationsMenu')])(OrganizationSidebar),
    [NS.schema('Organization'), NS.argu('Page')],
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  Name
];
