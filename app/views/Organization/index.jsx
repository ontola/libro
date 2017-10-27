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

const defaultProps = {
  orgColor: 'rgb(71, 86, 104)',
};

const OrganizationSidebarBlock = ({
  voteMatchCount,
}) => (
  <div>
    <SideBarLink icon="search" label="Moties zoeken" to={path.search()} />
    <SideBarLink
      icon="compass"
      label="Stemwijzer maken"
      to={path.createVoteMatch()}
      count={voteMatchCount}
    />
    <SideBarLink icon="th-large" label="Overzicht" to={path.index()} isIndex />
    <Property label={NS.argu('menus')} topology={NS.argu('sidebar')} />
  </div>
);

OrganizationSidebarBlock.propTypes = propTypes;
OrganizationSidebarBlock.defaultProps = defaultProps;

LinkedRenderStore.registerRenderer(
  OrganizationSidebarBlock,
  NS.schema('Organization'),
  RENDER_CLASS_NAME,
  NS.argu('sidebarBlock')
);

export default OrganizationSidebarBlock;
