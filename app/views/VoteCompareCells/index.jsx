import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './properties/comparedBeta';
import './properties/compareItemCount';
import './properties/totalScore';

const VoteCompareCells = () => (
  <Property label={NS.argu('totalScore')}>
    <Property label={NS.argu('compareItemCount')} />
  </Property>
);

LinkedRenderStore.registerRenderer(VoteCompareCells, NS.argu('CompareCell'));
LinkedRenderStore.registerRenderer(
  VoteCompareCells,
  NS.argu('CompareCell'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);
