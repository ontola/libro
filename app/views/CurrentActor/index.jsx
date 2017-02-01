import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  LDLink,
} from 'components';

const CurrentActorSidebar = () => (
  <div className="SideBarLink">
    <LDLink>
      <Property label="schema:image" topology="sideBar" />
      <div className="SideBarLink__label">
        <Property label="schema:name" />
      </div>
    </LDLink>
  </div>
);

LinkedRenderStore.registerRenderer(
  CurrentActorSidebar,
  'argu:CurrentActor',
  RENDER_CLASS_NAME,
  'sideBar'
);

import './properties/image';
import './properties/name';
