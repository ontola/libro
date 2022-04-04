import { register } from 'link-redux';

import { fullResourceTopology } from '../../topologies';

import getCollectionPage from './getCollectionPage';

const PageCollectionFullResource = getCollectionPage(
  false,
  fullResourceTopology,
);

export default register(PageCollectionFullResource);
