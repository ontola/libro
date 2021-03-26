import { createNS } from '@ontologies/core';

const dexes = createNS('https://argu.co/ns/dex#');

export default {
  ns: dexes,

  /* classes */
  // eslint-disable-next-line sort-keys
  Agreement: dexes('Agreement'),
  Folder: dexes('Folder'),
  HomePage: dexes('HomePage'),
  Invite: dexes('Invite'),
  Offer: dexes('Offer'),

  /* properties */
  assignee: dexes('assignee'),
  assigneeMail: dexes('assigneeMail'),
  assigner: dexes('assigner'),
  attributionOptions: dexes('attributionOptions'),
  dateSigned: dexes('dateSigned'),
  entries: dexes('entries'),
  file: dexes('file'),
  invites: dexes('invites'),
  obligations: dexes('obligations'),
  offer: dexes('offer'),
  permissions: dexes('permissions'),
  prohibitions: dexes('prohibitions'),
  recipients: dexes('recipients'),
  rules: dexes('rules'),
  transferAction: dexes('transferAction'),
};
