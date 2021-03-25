import { register } from 'link-redux';

import { containerTopology } from '../../topologies/Container';

import getCollection, { EMPTY_STRATEGY } from './getCollection';

const CollectionWithOmniform = getCollection(
  'CollectionWithOmniform', {
    emptyStrategy: EMPTY_STRATEGY.Interactable,
    omniform: true,
    topology: [
      containerTopology,
    ],
  },
);

export default register(CollectionWithOmniform);
