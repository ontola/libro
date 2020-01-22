import { createNS } from '@ontologies/core';

const org = createNS('http://www.w3.org/ns/org#');

export default {
  ns: org,

  /* classes */
  Membership: org('Membership'),

  /* properties */
  hasMembership: org('hasMembership'),
  member: org('member'),
  organization: org('organization'),
};
