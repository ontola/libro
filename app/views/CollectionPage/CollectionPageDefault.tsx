import { register } from 'link-redux';

import { allTopologiesExcept } from '../../topologies';
import { alertDialogTopology } from '../../topologies/Dialog';
import { fullResourceTopology } from '../../topologies/FullResource';
import { inlineTopology } from '../../topologies/Inline';
import { pageTopology } from '../../topologies/Page';

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
