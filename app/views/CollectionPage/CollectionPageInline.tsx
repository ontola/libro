import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { inlineTopology } from '../../topologies';

import { CollectionViewTypes } from './types';

const CollectionPageInline: FC = () => (
  <Property
    forceRender
    label={as.items}
    renderLimit={Infinity}
    separator=", "
  />
);

CollectionPageInline.type = CollectionViewTypes;

CollectionPageInline.topology = inlineTopology;

export default register(CollectionPageInline);
