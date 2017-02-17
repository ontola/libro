import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const CompareItemCount = ({ linkedProp }) => <span>Gebaseerd op {linkedProp} stemmen.</span>;

CompareItemCount.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  CompareItemCount,
  'argu:CompareCell',
  'argu:compareItemCount'
);

export default CompareItemCount;
