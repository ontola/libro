import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import './properties/comparedBeta';
import './properties/compareItemCount';
import './properties/totalScore';

const VoteCompareCells = () => (
  <Property label="argu:totalScore">
    <Property label="argu:compareItemCount" />
  </Property>
);

LinkedRenderStore.registerRenderer(VoteCompareCells, 'argu:CompareCell');
LinkedRenderStore.registerRenderer(
  VoteCompareCells,
  'argu:CompareCell',
  RENDER_CLASS_NAME,
  'argu:collection'
);
