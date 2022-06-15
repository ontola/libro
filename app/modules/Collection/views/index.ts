import Collection from './Collection';
import CollectionFilter from './CollectionFilter';
import CollectionPage from './CollectionPage';
import InfiniteCollectionPage from './InfiniteCollectionPage';

export default [
  ...Collection,
  ...CollectionFilter,
  ...CollectionPage,
  ...InfiniteCollectionPage,
];
