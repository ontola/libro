import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  ArguHome: argu('ArguHome'),
  Argument: argu('Argument'),
  Case: argu('Case'),
  ConArgument: argu('ConArgument'),
  ConfirmAction: argu('ConfirmAction'),
  ContainerNode: argu('ContainerNode'),
  Customer: argu('Customer'),
  Feature: argu('Feature'),
  MakePrimaryAction: argu('MakePrimaryAction'),
  Motion: argu('Motion'),
  Page: argu('Page'),
  ProArgument: argu('ProArgument'),
  ProcessStep: argu('ProcessStep'),
  Question: argu('Question'),
  SearchResult: argu('SearchResult'),
  SendConfirmationAction: argu('SendConfirmationAction'),
  Survey: argu('Survey'),

  /* properties */
  arguments: argu('arguments'),
  attachments: argu('attachments'),
  blogPosts: argu('blogPosts'),
  caseTitle: argu('caseTitle'),
  cases: argu('cases'),
  customers: argu('customers'),
  decision: argu('decision'),
  exampleClass: argu('exampleClass'),
  expiresAt: argu('expiresAt'),
  faq: argu('faq'),
  features: argu('features'),
  followsCount: argu('followsCount'),
  grantedGroups: argu('grantedGroups'),
  icon: argu('icon'),
  lastActivityAt: argu('lastActivityAt'),
  motions: argu('motions'),
  motionsCount: argu('motionsCount'),
  pinnedAt: argu('pinnedAt'),
  processSteps: argu('processSteps'),
  reactionsCount: argu('reactionsCount'),
  redirectUrl: argu('redirectUrl'),
  trashActivity: argu('trashActivity'),
  trashedAt: argu('trashedAt'),
  voteEvents: argu('voteEvents'),
  voteableVoteEvent: argu('voteableVoteEvent'),
  votesCount: argu('votesCount'),
};
