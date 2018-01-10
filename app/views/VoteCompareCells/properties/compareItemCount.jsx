import { linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const CompareItemCount = ({ linkedProp }) => <span>Gebaseerd op {linkedProp.value} stemmen.</span>;

CompareItemCount.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CompareItemCount,
  NS.argu('CompareCell'),
  NS.argu('compareItemCount')
);

export default CompareItemCount;
