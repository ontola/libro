import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import {
  LDLink,
} from 'components';

import './properties/name';

const CurrentActorSidebar = () => (
  <div className="SideBarLink">
    <LDLink>
      <Property label="schema:image" />
      <div className="SideBarLink__label">
        <Property label="schema:name" />
      </div>
    </LDLink>
  </div>
);

LinkedRenderStore.registerRenderer(
  CurrentActorSidebar,
  'schema:Person',
  RENDER_CLASS_NAME,
  'sidebar'
);
