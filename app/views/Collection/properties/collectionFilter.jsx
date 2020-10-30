import as from '@ontologies/as';
import { register } from 'link-redux';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

const CollectionFilterCollection = () => null;

CollectionFilterCollection.type = [
  ontola.Collection,
  as.Collection,
];

CollectionFilterCollection.topology = allTopologies;

CollectionFilterCollection.property = ontola.collectionFilter;

export default register(CollectionFilterCollection);
