import { Property } from 'link-redux';
import React, { PropTypes } from 'react';

import {
  CompareVotesBar,
} from 'components';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropVal,
};

const TotalScore = ({ children, linkedProp }) => (
  <CompareVotesBar
    label={<Property label="argu:comparedBeta" />}
    totalValue={linkedProp}
  >
    {children}
  </CompareVotesBar>
);

TotalScore.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  TotalScore,
  'argu:CompareCell',
  'argu:totalScore'
);

export default TotalScore;
