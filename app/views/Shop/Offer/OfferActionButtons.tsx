import { Property } from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../../components/Button';
import ontola from '../../../ontology/ontola';
import ActionsBar from '../../../topologies/ActionsBar';

const OfferActionButtons: React.FC = () => (
  <ActionsBar>
    <Property label={ontola.createAction} theme={ButtonTheme.Default} />
    <Property label={ontola.removeFromCart} />
  </ActionsBar>
);

export default OfferActionButtons;
