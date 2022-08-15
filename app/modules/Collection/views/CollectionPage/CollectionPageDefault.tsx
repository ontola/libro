import { register } from 'link-redux';

import { allTopologiesExcept } from '../../../../topologies';
import {
  alertDialogTopology,
  fullResourceTopology,
  inlineTopology,
  pageTopology,
} from '../../../Common/topologies';

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
