import as from '@ontologies/as';

import { NS } from '../../helpers/LinkedRenderStore';

export const CollectionTypes = [
  NS.ontola('Collection'),
  as.Collection,
  NS.ontola('FilteredCollection'),
  NS.hydra('Collection'),
];

export default CollectionTypes;
