import { register } from 'link-redux';

import { parentTopology } from '../../../Common/topologies/BreadcrumbsBar';
import ontola from '../../../Core/ontology/ontola';

const GuestUserParent = () => null;

GuestUserParent.type = ontola.GuestUser;

GuestUserParent.topology = parentTopology;

export default register(GuestUserParent);
