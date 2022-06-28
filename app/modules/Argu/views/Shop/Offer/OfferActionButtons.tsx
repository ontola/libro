import { Property } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../../../ontology/ontola';
import ActionsBar from '../../../../../topologies/ActionsBar';
import { ButtonVariant } from '../../../../Common/components/Button';

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