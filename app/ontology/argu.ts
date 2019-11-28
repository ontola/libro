import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  Argument: argu('Argument'),
  ConArgument: argu('ConArgument'),
  ContainerNode: argu('ContainerNode'),
  Page: argu('Page'),
  ProArgument: argu('ProArgument'),
  SearchResult: argu('SearchResult'),

  /* properties */
  arguments: argu('arguments'),
  attachments: argu('attachments'),
  blogPosts: argu('blogPosts'),
  decision: argu('decision'),
  expiresAt: argu('expiresAt'),
  followsCount: argu('followsCount'),
  grantedGroups: argu('grantedGroups'),
  lastActivityAt: argu('lastActivityAt'),
  motions: argu('motions'),
  motionsCount: argu('motionsCount'),
  pinnedAt: argu('pinnedAt'),
  redirectUrl: argu('redirectUrl'),
  trashActivity: argu('trashActivity'),
  trashedAt: argu('trashedAt'),
  voteEvents: argu('voteEvents'),
  voteableVoteEvent: argu('voteableVoteEvent'),
};
