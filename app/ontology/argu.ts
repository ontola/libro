import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  ArguHome: argu('ArguHome'),
  Argument: argu('Argument'),
  BearerToken: argu('BearerToken'),
  Case: argu('Case'),
  Comment: argu('Comment'),
  ConArgument: argu('ConArgument'),
  ConfirmAction: argu('ConfirmAction'),
  Confirmation: argu('Users::Confirmation'),
  ContactPage: argu('ContactPage'),
  ContainerNode: argu('ContainerNode'),
  ConvertActivity: argu('ConvertActivity'),
  CopyAction: argu('CopyAction'),
  Customer: argu('Customer'),
  EmailToken: argu('EmailToken'),
  Feature: argu('Feature'),
  ForwardActivity: argu('ForwardActivity'),
  Group: argu('Group'),
  Link: argu('Link'),
  MakePrimaryAction: argu('MakePrimaryAction'),
  MediaObject: argu('MediaObject'),
  Menu: argu('Menu'),
  MenuSection: argu('MenuSection'),
  Motion: argu('Motion'),
  Notification: argu('Notification'),
  Page: argu('Page'),
  Phase: argu('Phase'),
  Placement: argu('Placement'),
  ProArgument: argu('ProArgument'),
  ProcessStep: argu('ProcessStep'),
  Project: argu('Project'),
  PublishActivity: argu('PublishActivity'),
  Question: argu('Question'),
  SendConfirmationAction: argu('SendConfirmationAction'),
  SubMenu: argu('SubMenu'),
  Survey: argu('Survey'),
  ['Update::Opinion']: argu('Update::Opinion'),
  Vote: argu('Vote'),
  VoteEvent: argu('VoteEvent'),

  /* properties */
  abstain: argu('abstain'),
  anonymousID: argu('anonymousID'),
  applyLink: argu('applyLink'),
  arguments: argu('arguments'),
  attachments: argu('attachments'),
  blogPosts: argu('blogPosts'),
  caseTitle: argu('caseTitle'),
  cases: argu('cases'),
  childrenPlacements: argu('childrenPlacements'),
  commentsCount: argu('commentsCount'),
  communicateAction: argu('communicateAction'),
  conArguments: argu('conArguments'),
  copyUrl: argu('copyUrl'),
  create_opinion: argu('create_opinion'),
  currentPhase: argu('currentPhase'),
  currentVote: argu('currentVote'),
  customers: argu('customers'),
  decision: argu('decision'),
  discussions: argu('discussions'),
  email: argu('email'),
  exampleClass: argu('exampleClass'),
  expiresAt: argu('expiresAt'),
  externalIRI: argu('externalIRI'),
  faq: argu('faq'),
  features: argu('features'),
  field: argu('field'),
  followsCount: argu('followsCount'),
  grantedGroups: argu('grantedGroups'),
  icon: argu('icon'),
  invitee: argu('invitee'),
  isOpinion: argu('isOpinion'),
  lastActivityAt: argu('lastActivityAt'),
  motions: argu('motions'),
  motionsCount: argu('motionsCount'),
  nameSingular: argu('nameSingular'),
  neutral: argu('neutral'),
  no: argu('no'),
  opened: argu('opened'),
  opinion: argu('opinion'),
  other: argu('other'),
  parentView: argu('parentView'),
  pdfPage: argu('pdfPage'),
  pdfPositionX: argu('pdfPositionX'),
  pdfPositionY: argu('pdfPositionY'),
  phases: argu('phases'),
  pinned: argu('pinned'),
  pinnedAt: argu('pinnedAt'),
  primaryEmail: argu('primaryEmail'),
  primaryVote: argu('primaryVote'),
  proArguments: argu('proArguments'),
  processSteps: argu('processSteps'),
  questions: argu('questions'),
  reactionsCount: argu('reactionsCount'),
  signInFlow: argu('signInFlow'),
  time: argu('time'),
  took: argu('took'),
  topComment: argu('topComment'),
  trashActivity: argu('trashActivity'),
  trashedAt: argu('trashedAt'),
  unread: argu('unread'),
  unreadCount: argu('unreadCount'),
  update_opinion: argu('update_opinion'),
  url: argu('url'),
  usages: argu('usages'),
  voteEvents: argu('voteEvents'),
  voteableVoteEvent: argu('voteableVoteEvent'),
  votes: argu('votes'),
  votesConCount: argu('votesConCount'),
  votesCount: argu('votesCount'),
  votesNeutralCount: argu('votesNeutralCount'),
  votesProCount: argu('votesProCount'),
  yes: argu('yes'),

  /*
   * topologies
   * Use the exported constants over these.
   */

  actionsBar: argu('actionsBar'),
  card: argu('card'),
  cardFixed: argu('cardFixed'),
  cardList: argu('cardList'),
  cardMain: argu('cardMain'),
  container: argu('container'),
  detail: argu('detail'),
  formFooter: argu('formFooter'),
  fullResource: argu('fullResource'),
  grid: argu('grid'),
  inline: argu('inline'),
  tabPane: argu('tabPane'),
  void: argu('void'),
  voteBubble: argu('voteBubble'),
  voteEvent: argu('voteEvent'),
  widget: argu('widget'),
};
