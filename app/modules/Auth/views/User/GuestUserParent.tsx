import { register } from 'link-redux';

import ontola from '../../../../ontology/ontola';
import { parentTopology } from '../../../../topologies';

const GuestUserParent = () => null;

GuestUserParent.type = ontola.GuestUser;

GuestUserParent.topology = parentTopology;

export default register(GuestUserParent);
