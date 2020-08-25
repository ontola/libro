import { createNS } from '@ontologies/core';

const dexes = createNS('https://argu.co/ns/dex#');

export default {
  ns: dexes,

  /* classes */
  Agreement: dexes('Agreement'),
  Folder: dexes('Folder'),
  FolderEntry: dexes('FolderEntry'),
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
  offer: dexes('offer'),
  recipients: dexes('recipients'),
  transferAction: dexes('transferAction'),
};
