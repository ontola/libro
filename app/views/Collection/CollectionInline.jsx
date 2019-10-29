import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../topologies/Inline';

import { CollectionTypes } from './types';

const CollectionInline = () => (
  <p>
    <label><Property label={NS.as('name')} /> </label>
    <Property forceRender insideCollection label={NS.ontola('pages')} />
  </p>
);

CollectionInline.type = CollectionTypes;

CollectionInline.mapDataToProps = [NS.rdf('type')];

CollectionInline.topology = inlineTopology;

export default register(CollectionInline);
