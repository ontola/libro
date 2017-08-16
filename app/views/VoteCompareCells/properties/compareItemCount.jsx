import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const CompareItemCount = ({ linkedProp }) => <span>Gebaseerd op {linkedProp} stemmen.</span>;

CompareItemCount.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CompareItemCount,
  NS.argu('CompareCell'),
  NS.argu('compareItemCount')
);

export default CompareItemCount;
