import { register } from 'link-redux';

import { alertDialogTopology } from '../../../Common/topologies';

import getCollectionPage from './getCollectionPage';

const CollectionPageAlert = getCollectionPage(
  false,
  alertDialogTopology,
);

export default register(CollectionPageAlert);
