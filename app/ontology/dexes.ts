import { createNS } from '@ontologies/core';

const dexes = createNS('https://argu.co/ns/dex#');

export default {
  ns: dexes,

  /* classes */
  Folder: dexes('Folder'),
  FolderEntry: dexes('FolderEntry'),

  /* properties */
  entries: dexes('entries'),
};
