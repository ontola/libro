import { Property, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CompareVotesBar } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const TotalScore = ({ children, linkedProp }) => (
  <CompareVotesBar
    label={<Property label={NS.argu('comparedBeta')} />}
    totalValue={linkedProp.value}
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
