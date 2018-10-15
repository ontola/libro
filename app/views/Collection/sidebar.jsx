import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  Property,
  subjectType,
  withLinkCtx,
} from 'link-redux';
import React from 'react';

import { SideBarLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../topologies/Sidebar';

import { CollectionTypes } from './types';

const propTypes = {
  subject: subjectType,
};

const label = (
  <React.Fragment>
    <Property label={NS.as('name')} />
    <Property label={NS.argu('unreadCount')} />
  </React.Fragment>
);

const CollectionSidebar = ({ subject }) => (
  <SideBarLink
    icon="bell"
    label={label}
    to={subject.value}
  />
);

CollectionSidebar.propTypes = propTypes;

const ConnectedCollection = withLinkCtx(CollectionSidebar);

export default LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  CollectionTypes,
  RENDER_CLASS_NAME,
  sidebarTopology
);
