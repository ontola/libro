import { Property } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../../Action/topologies/ActionsBar';
import { ButtonVariant } from '../../../../Common/components/Button';
import ontola from '../../../../Core/ontology/ontola';
import argu from '../../../lib/argu';

const OfferActionButtons: React.FC = () => (
  <ActionsBar>
    <Property label={argu.cartDetail}>
      <Property
        label={ontola.createAction}
        variant={ButtonVariant.Default}
      />
      <Property label={ontola.destroyAction} />
    </Property>
  </ActionsBar>
);

export default OfferActionButtons;
