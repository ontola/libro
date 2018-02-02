import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Creator = ({ linkedProp }) => {
  const object = linkedProp.includes('://')
    ? linkedProp
    : `https://beta.argu.co/persons/${linkedProp.value}`;
  return (
    <LinkedResourceContainer
      subject={object}
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

LinkedRenderStore.registerRenderer(
  Creator,
  [NS.argu('Vote'), NS.aod('Vote'), NS.aod('Count')],
  [NS.schema('creator'), NS.aod('voter_id')],
  NS.argu('voteSidePage')
);
