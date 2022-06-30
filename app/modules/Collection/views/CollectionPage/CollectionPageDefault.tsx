import { register } from 'link-redux';

import { allTopologiesExcept } from '../../../../topologies';
import { inlineTopology } from '../../../Common/topologies';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { pageTopology } from '../../../Common/topologies/Page';

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
