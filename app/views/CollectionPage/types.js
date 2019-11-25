import as from '@ontologies/as';

import { NS } from '../../helpers/LinkedRenderStore';

export const CollectionViewTypes = [
  as.CollectionPage,
  NS.ontola('CollectionView'),
  NS.ontola('PaginatedView'),
];

export default CollectionViewTypes;
