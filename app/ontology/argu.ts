import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  Argument: argu('Argument'),
  ConArgument: argu('ConArgument'),
  ContainerNode: argu('ContainerNode'),
  ProArgument: argu('ProArgument'),
  SearchResult: argu('SearchResult'),

  /* properties */
  attachments: argu('attachments'),
  expiresAt: argu('expiresAt'),
  followsCount: argu('followsCount'),
  grantedGroups: argu('grantedGroups'),
  lastActivityAt: argu('lastActivityAt'),
  motionsCount: argu('motionsCount'),
  pinnedAt: argu('pinnedAt'),
  trashedAt: argu('trashedAt'),
};
