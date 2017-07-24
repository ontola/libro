import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

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
      topology="argu:voteBubble"
    />
  );
};

Creator.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Creator,
  ['argu:Vote', 'aod:Vote', 'aod:Count'],
  ['schema:creator', 'aod:voter_id']
);
