import { Property } from 'link-redux';
import React from 'react';

import { ButtonTheme } from '../../../components/Button';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import ActionsBar from '../../../topologies/ActionsBar';

const OfferActionButtons: React.FC = () => (
  <ActionsBar>
    <Property label={argu.cartDetail}>
      <Property
        label={ontola.createAction}
        theme={ButtonTheme.Default}
      />
      <Property label={ontola.destroyAction} />
    </Property>
  </ActionsBar>
);

export default OfferActionButtons;
