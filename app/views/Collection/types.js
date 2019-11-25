import as from '@ontologies/as';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';

export const CollectionTypes = [
  ontola.Collection,
  as.Collection,
  ontola.FilteredCollection,
  NS.hydra('Collection'),
];

export default CollectionTypes;
