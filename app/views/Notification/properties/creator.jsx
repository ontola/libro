import {
  linkedPropType,
  LinkedObjectContainer,
  Property,
} from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => (
  <LinkedObjectContainer object={linkedProp} topology={NS.argu('detail')}>
    <Property label={NS.schema('image')} />
  </LinkedObjectContainer>
);

Creator.propTypes = propTypes;

[undefined, NS.argu('collection'), NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    Creator,
    NS.argu('Notification'),
    NS.schema('creator'),
    top
  );
});

export default URL;
