import { register } from 'link-redux';

import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

import getCollection, { EMPTY_STRATEGY } from './getCollection';

const CollectionVisibleOnEmpty = getCollection(
  'CollectionVisibleOnEmpty', {
    emptyStrategy: EMPTY_STRATEGY.Always,
    topology: [
      fullResourceTopology,
      tabPaneTopology,
      gridTopology,
    ],
  },
);

export default register(CollectionVisibleOnEmpty);
