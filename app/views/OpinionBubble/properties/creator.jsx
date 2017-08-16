import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const Creator = ({ linkedProp }) => {
  const object = linkedProp.includes('://')
    ? linkedProp
    : `https://beta.argu.co/persons/${linkedProp}`;
  return (
    <LinkedObjectContainer
      object={object}
      topology={NS.argu('voteBubble')}
    />
  );
};

Creator.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Creator,
  [NS.argu('Vote'), NS.aod('Vote'), NS.aod('Count')],
  [NS.schema('creator'), NS.aod('voter_id')]
);
