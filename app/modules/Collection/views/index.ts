import { ViewRegistrations } from '../../../Module';

import Collection from './Collection';
import CollectionFilter from './CollectionFilter';
import CollectionPage from './CollectionPage';
import InfiniteCollectionPage from './InfiniteCollectionPage';

const views: ViewRegistrations = [
  ...Collection,
  ...CollectionFilter,
  ...CollectionPage,
  ...InfiniteCollectionPage,
];

export default views;
