import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  lowLevel,
  Property,
  subjectType,
} from 'link-redux';
import React from 'react';

import { SideBarLink } from '../../components';
import { retrievePath } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  subject: subjectType,
};

const label = (
  <span>
    <Property label={NS.schema('name')} />
    <Property label={NS.argu('unreadCount')} />
  </span>
);

const CollectionSidebar = ({ subject }) => (
  <SideBarLink
    icon="bell"
    label={label}
    to={retrievePath(subject.value)}
  />
);

CollectionSidebar.propTypes = propTypes;

const ConnectedCollection = lowLevel.linkedSubject(lowLevel.linkedVersion(CollectionSidebar));

export default LinkedRenderStore.registerRenderer(
  ConnectedCollection,
  NS.argu('InfiniteCollection'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);

export { default as Member } from './properties/members';
export { default as Views } from './properties/views';
