import { register } from 'link-redux';

import {
  alertDialogTopology,
  allTopologiesExcept,
  fullResourceTopology,
  inlineTopology,
  pageTopology,
} from '../../../../topologies';

import getCollectionPage from './getCollectionPage';

const CollectionPageDefault = getCollectionPage(
  true,
  allTopologiesExcept(
    alertDialogTopology,
    fullResourceTopology,
    inlineTopology,
    pageTopology,
  ),
);

export default register(CollectionPageDefault);
