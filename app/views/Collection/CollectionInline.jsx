import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../topologies/Inline';

import { CollectionTypes } from './types';

const CollectionInline = () => (
  <div>
    <label><Property label={NS.as('name')} /> </label>
    <Property forceRender insideCollection label={NS.as('pages')} />
  </div>
);

CollectionInline.type = CollectionTypes;

CollectionInline.mapDataToProps = [NS.rdf('type')];

CollectionInline.topology = inlineTopology;

export default register(CollectionInline);
