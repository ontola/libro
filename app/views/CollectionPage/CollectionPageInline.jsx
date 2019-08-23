import {
  Property,
  register,
} from 'link-redux';
import React from 'react';
import { withRouter } from 'react-router';

import { NS } from '../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../topologies/Inline';

import { CollectionViewTypes } from './types';

const CollectionPageInline = () => (
  <Property
    forceRender
    label={NS.as('items')}
    renderLimit={Infinity}
    separator=", "
  />
);

CollectionPageInline.type = CollectionViewTypes;

CollectionPageInline.topology = inlineTopology;

CollectionPageInline.hocs = [withRouter];

export default register(CollectionPageInline);
