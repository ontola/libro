import { createNS } from '@ontologies/core';

const dexes = createNS('https://argu.co/ns/dex#');

export default {
  ns: dexes,

  /* classes */
  Folder: dexes('Folder'),
  FolderEntry: dexes('FolderEntry'),
  HomePage: dexes('HomePage'),

  /* properties */
  entries: dexes('entries'),
  transferAction: dexes('transferAction'),
};
