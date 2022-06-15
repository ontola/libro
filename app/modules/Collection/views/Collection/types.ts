import * as as from '@ontologies/as';

import hydra from '../../../../ontology/hydra';
import ontola from '../../../../ontology/ontola';

export const CollectionTypes = [
  ontola.Collection,
  as.Collection,
  ontola.SearchResult,
  hydra.Collection,
];

export default CollectionTypes;
