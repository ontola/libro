import LinkedRenderStore from 'link-lib';
import { linkedPropType, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { CardContent } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import CardRow from '../../../topologies/Card/CardRow';

const propTypes = {
  linkedProp: linkedPropType,
};

const superEventCard = ({ linkedProp }) => (
  <CardRow>
    <CardContent>
      Besproken in: <LinkedResourceContainer subject={linkedProp} />
    </CardContent>
  </CardRow>
);

superEventCard.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  superEventCard,
  NS.schema('Thing'),
  NS.schema('superEvent'),
  [
    cardMainTopology,
    cardTopology,
  ]
);
