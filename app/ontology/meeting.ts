import { createNS } from '@ontologies/core';

const meeting = createNS('https://argu.co/ns/meeting/');

export default {
  ns: meeting,

  /* classes */
  AgendaItem: meeting('AgendaItem'),
  Meeting: meeting('Meeting'),

  /* properties */
  agenda: meeting('agenda'),
  attachment: meeting('attachment'),
};
