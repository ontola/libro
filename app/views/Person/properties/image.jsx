import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const PersonImageProp = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteBubble')}
  />
);

PersonImageProp.propTypes = propTypes;

export default [
  LinkedRenderStore.registerRenderer(
    PersonImageProp,
    [NS.schema('Person'), NS.aod('Persons')],
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    [NS.argu('detail'), NS.argu('voteBubble')]
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => (
      <LinkedObjectContainer object={linkedProp} />
    ),
    [NS.schema('Person'), NS.aod('Persons')],
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    NS.argu('sidebar')
  ),
];
