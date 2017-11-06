import {
  LinkedObjectContainer,
  linkedPropType,
  Type,
} from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import { CardButton } from '../../../components';
import CollapsibleContainer from '../../../containers/CollapsibleContainer';


const InfiniteCollectionNext = ({ linkedProp }) => (
  <LinkedObjectContainer object={linkedProp}>
    <CollapsibleContainer
      alwaysMountChildren={false}
      id={linkedProp}
      trigger={<CardButton plain>Load more</CardButton>}
    >
      <Type />
    </CollapsibleContainer>
  </LinkedObjectContainer>
);

InfiniteCollectionNext.propTypes = {
  linkedProp: linkedPropType,
};

LinkedRenderStore.registerRenderer(
  InfiniteCollectionNext,
  NS.argu('InfiniteCollection'),
  NS.argu('next')
);

export default InfiniteCollectionNext;
