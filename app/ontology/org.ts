import { createNS } from '@ontologies/core';

const org = createNS('http://www.w3.org/ns/org#');

export default {
  ns: org,

  /* classes */
  // eslint-disable-next-line sort-keys
  Membership: org('Membership'),

  /* properties */
  hasMember: org('hasMember'),
  hasMembership: org('hasMembership'),
  member: org('member'),
  organization: org('organization'),
};
