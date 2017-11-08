import { Property, linkedPropType } from 'link-redux';
import React, { PropTypes } from 'react';

import { CompareVotesBar } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const TotalScore = ({ children, linkedProp }) => (
  <CompareVotesBar
    label={<Property label={NS.argu('comparedBeta')} />}
    totalValue={linkedProp}
  >
    {children}
  </CompareVotesBar>
);

TotalScore.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  TotalScore,
  NS.argu('CompareCell'),
  NS.argu('totalScore')
);

export default TotalScore;
