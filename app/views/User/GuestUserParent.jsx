import { register } from 'link-redux';

import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { parentTopology } from '../../topologies/Parent';

const GuestUserParent = () => null;

GuestUserParent.type = [
  ontola.GuestUser,
  teamGL.User,
];

GuestUserParent.topology = parentTopology;

export default register(GuestUserParent);
