import * as as from '@ontologies/as';

import hydra from '../../../../ontology/hydra';
import ontola from '../../../Kernel/ontology/ontola';

export const GenericCollectionTypes = [
  ontola.Collection,
  as.Collection,
  hydra.Collection,
];

export const CollectionTypes = [
  ...GenericCollectionTypes,
  ontola.SearchResult,
];
