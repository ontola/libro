import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  SideBarLink,
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';
import path from '../../helpers/paths';

import './NavBarContent.scss';
import './properties/name';

const propTypes = {
  voteMatchCount: PropTypes.number,
};

const OrganizationSidebarBlock = ({
  voteMatchCount,
}) => (
  <div>
    <SideBarLink icon="search" label="Moties zoeken" to={path.search()} />
    <SideBarLink
      count={voteMatchCount}
      icon="compass"
      label="Stemwijzer maken"
      to={path.createVoteMatch()}
    />
    <SideBarLink isIndex icon="th-large" label="Overzicht" to={path.index()} />
    <Property label={NS.argu('menus')} topology={NS.argu('sidebar')} />
  </div>
);

OrganizationSidebarBlock.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  OrganizationSidebarBlock,
  NS.schema('Organization'),
  RENDER_CLASS_NAME,
  NS.argu('sidebarBlock')
);

export default OrganizationSidebarBlock;
