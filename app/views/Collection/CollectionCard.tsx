import { register } from 'link-redux';

import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';

import getCollection, { EMPTY_STRATEGY } from './getCollection';

const CollectionCard = getCollection(
  'CardCollection', {
    emptyStrategy: EMPTY_STRATEGY.Interactable,
    topology: [
      cardTopology,
      cardMainTopology,
    ],
  },
);

export default register(CollectionCard);
