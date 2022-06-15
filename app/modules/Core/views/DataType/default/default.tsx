import { Literal } from '@ontologies/core';
import * as rdfs from '@ontologies/rdfs';
import { RENDER_CLASS_NAME } from 'link-lib';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';

export interface DataTypeRendererProps {
  linkedProp: Literal;
}

const DataTypeRenderer: FC<DataTypeRendererProps> = ({ linkedProp }) => (
  <React.Fragment>
    {linkedProp?.value}
  </React.Fragment>
);

DataTypeRenderer.type = rdfs.Literal;

DataTypeRenderer.property = RENDER_CLASS_NAME;

DataTypeRenderer.topology = allTopologies;

export default register(DataTypeRenderer);
