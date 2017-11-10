import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

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
    <Property label={NS.argu('navigationsMenu')} topology={NS.argu('sidebar')} />
  </div>
);

OrganizationSidebarBlock.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  OrganizationSidebarBlock,
  [NS.schema('Organization'), NS.argu('Page')],
  RENDER_CLASS_NAME,
  NS.argu('sidebarBlock')
);

export default OrganizationSidebarBlock;
