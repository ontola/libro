import CollectionPageAlert from './CollectionPageAlert';
import CollectionPageDefault from './CollectionPageDefault';
import PageCollectionFullResource from './CollectionPageFullResource';
import CollectionPageInline from './CollectionPageInline';
import Empty from './properties/empty';
import Items from './properties/items';
import Name from './properties/name';
import Views from './properties/views';

export default [
  ...CollectionPageAlert,
  ...CollectionPageDefault,
  ...PageCollectionFullResource,
  ...CollectionPageInline,
  ...Empty,
  ...Items,
  ...Name,
  ...Views,
];
