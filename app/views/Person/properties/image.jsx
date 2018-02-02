import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const PersonImageProp = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
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
      <LinkedResourceContainer subject={linkedProp} />
    ),
    [NS.schema('Person'), NS.aod('Persons')],
    [NS.schema('image'), NS.dbo('thumbnail'), NS.wdt('P18')],
    NS.argu('sidebar')
  ),
];
