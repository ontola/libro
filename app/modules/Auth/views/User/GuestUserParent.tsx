import { register } from 'link-redux';

import { parentTopology } from '../../../Common/topologies';
import ontola from '../../../Kernel/ontology/ontola';

const GuestUserParent = () => null;

GuestUserParent.type = ontola.GuestUser;

GuestUserParent.topology = parentTopology;

export default register(GuestUserParent);
