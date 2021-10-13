import { createNS } from '@ontologies/core';

const dexes = createNS('https://argu.co/ns/dex#');

export default {
  ns: dexes,

  /* classes */
  // eslint-disable-next-line sort-keys
  Agreement: dexes('Agreement'),
  Dataset: dexes('Dataset'),
  Distribution: dexes('Distribution'),
  Folder: dexes('Folder'),
  HomePage: dexes('HomePage'),
  Invite: dexes('Invite'),
  Offer: dexes('Offer'),

  /* properties */
  assigner: dexes('assigner'),
  attributionOptions: dexes('attributionOptions'),
  brokerUrl: dexes('brokerUrl'),
  dataOwner: dexes('dataOwner'),
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
