import { register } from 'link-redux';

import { fullResourceTopology } from '../../topologies/FullResource';

import getCollectionPage from './getCollectionPage';

const PageCollectionFullResource = getCollectionPage(
  false,
  fullResourceTopology,
);

export default register(PageCollectionFullResource);
