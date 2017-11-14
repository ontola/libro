import { LinkedObjectContainer, Property, Type, linkedPropType } from 'link-redux';
import { NamedNode } from 'rdflib';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import { FRONTEND_URL } from '../../../config';

const propTypes = {
  linkedProp: linkedPropType,
};

const Contains = ({ linkedProp }) => (
  <LinkedObjectContainer
    forceRender
    object={linkedProp}
  >
    <div className="NavBarContent__switcher">
      <LinkedObjectContainer object={`${FRONTEND_URL}/menus/organizations`} />
      <Property label={NS.schema('name')} />
    </div>
    <Type />
  </LinkedObjectContainer>
);

Contains.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Contains,
  [NS.schema('Thing'), new NamedNode('http://www.w3.org/2007/ont/link#Document')],
  NS.argu('contains'),
  NS.argu('sidebarBlock')
);

export default Contains;
