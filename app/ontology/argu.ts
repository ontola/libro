import { createNS } from '@ontologies/core';

const argu = createNS('https://argu.co/ns/core#');

export default {
  ns: argu,

  /* classes */
  // eslint-disable-next-line sort-keys
  Argument: argu('Argument'),
  BearerToken: argu('BearerToken'),
  BlogPost: argu('BlogPost'),
  Book: argu('Book'),
  BudgetShop: argu('BudgetShop'),
  Cart: argu('Cart'),
  CartDetail: argu('CartDetail'),
  Chapter: argu('Chapter'),
  Comment: argu('Comment'),
  ConArgument: argu('ConArgument'),
  ConfirmAction: argu('ConfirmAction'),
  Confirmation: argu('Users::Confirmation'),
  ContactPage: argu('ContactPage'),
  ContainerNode: argu('ContainerNode'),
  ConvertActivity: argu('ConvertActivity'),
  CopyAction: argu('CopyAction'),
  CouponBatch: argu('CouponBatch'),
  CustomAction: argu('CustomAction'),
  CustomForm: argu('CustomForm'),
  CustomFormField: argu('CustomFormField'),
  EmailToken: argu('EmailToken'),
  Footer: argu('Footer'),
  ForwardActivity: argu('ForwardActivity'),
  Group: argu('Group'),
  LegendItem: argu('LegendItem'),
  Link: argu('Link'),
  LowerSecion: argu('LowerSection'),
  MakePrimaryAction: argu('MakePrimaryAction'),
  Manifest: argu('Manifest'),
  Menu: argu('Menu'),
  MenuSection: argu('MenuSection'),
  Motion: argu('Motion'),
  Notification: argu('Notification'),
  Page: argu('Page'),
  Phase: argu('Phase'),
  Placement: argu('Placement'),
  ProArgument: argu('ProArgument'),
  Project: argu('Project'),
  PublishActivity: argu('PublishActivity'),
  Question: argu('Question'),
  SendConfirmationAction: argu('SendConfirmationAction'),
  Shop: argu('Shop'),
  SocialButton: argu('SocialButton'),
  SubMenu: argu('SubMenu'),
  Submission: argu('Submission'),
  SubmissionData: argu('SubmissionData'),
  SubmitAction: argu('SubmitAction'),
  Survey: argu('Survey'),
  Term: argu('Term'),
  Timeline: argu('Timeline'),
  TimelineItem: argu('TimelineItem'),
  ['Update::Opinion']: argu('Update::Opinion'),
  Vocabulary: argu('Vocabulary'),
  Vote: argu('Vote'),
  VoteEvent: argu('VoteEvent'),

  /* properties */
  abstain: argu('abstain'),
  applyLink: argu('applyLink'),
  arguments: argu('arguments'),
  attachments: argu('attachments'),
  blogPosts: argu('blogPosts'),
  budgetMax: argu('budgetMax'),
  cart: argu('cart'),
  cartDetail: argu('cartDetail'),
  cases: argu('cases'),
  chapterContent: argu('chapterContent'),
  chapters: argu('chapters'),
  checkoutAction: argu('checkoutAction'),
  childrenPlacements: argu('childrenPlacements'),
  columns: argu('columns'),
  commentsCount: argu('commentsCount'),
  communicateAction: argu('communicateAction'),
  conArguments: argu('conArguments'),
  copyUrl: argu('copyUrl'),
  coupons: argu('coupons'),
  create_opinion: argu('create_opinion'),
  currentPhase: argu('currentPhase'),
  currentVote: argu('currentVote'),
  customFormFields: argu('customFormFields'),
  customers: argu('customers'),
  decision: argu('decision'),
  discussions: argu('discussions'),
  email: argu('email'),
  expiresAt: argu('expiresAt'),
  externalIRI: argu('externalIRI'),
  faq: argu('faq'),
  field: argu('field'),
  followsCount: argu('followsCount'),
  grantedGroups: argu('grantedGroups'),
  icon: argu('icon'),
  invitee: argu('invitee'),
  isDraft: argu('isDraft'),
  isOpinion: argu('isOpinion'),
  lastActivityAt: argu('lastActivityAt'),
  legend: argu('legend'),
  legendType: argu('legendType'),
  lowerSection: argu('lowerSection'),
  maxUsages: argu('maxUsages'),
  motions: argu('motions'),
  motionsCount: argu('motionsCount'),
  nameSingular: argu('nameSingular'),
  neutral: argu('neutral'),
  no: argu('no'),
  offers: argu('offers'),
  opened: argu('opened'),
  opinion: argu('opinion'),
  order: argu('order'),
  other: argu('other'),
  parentView: argu('parentView'),
  pdfPage: argu('pdfPage'),
  pdfPositionX: argu('pdfPositionX'),
  pdfPositionY: argu('pdfPositionY'),
  phases: argu('phases'),
  pinned: argu('pinned'),
  pinnedAt: argu('pinnedAt'),
  policy: argu('policy'),
  price: argu('price'),
  primaryEmail: argu('primaryEmail'),
  primaryVote: argu('primaryVote'),
  privacy: argu('privacy'),
  proArguments: argu('proArguments'),
  questions: argu('questions'),
  rawResource: argu('rawResource'),
  selectedValue: argu('selectedValue'),
  signInFlow: argu('signInFlow'),
  socials: argu('socials'),
  subChapters: argu('subChapters'),
  submissionData: argu('submissionData'),
  submissionStatus: argu('submissionStatus'),
  submitted: argu('submitted'),
  taggings: argu('taggings'),
  terms: argu('terms'),
  time: argu('time'),
  timelineItems: argu('timelineItems'),
  token: argu('token'),
  took: argu('took'),
  topComment: argu('topComment'),
  trackingId: argu('trackingId'),
  trashActivity: argu('trashActivity'),
  trashedAt: argu('trashedAt'),
  unread: argu('unread'),
  unreadCount: argu('unreadCount'),
  update_opinion: argu('update_opinion'),
  url: argu('url'),
  usages: argu('usages'),
  usedCoupons: argu('usedCoupons'),
  voteEvents: argu('voteEvents'),
  voteableVoteEvent: argu('voteableVoteEvent'),
  votes: argu('votes'),
  votesConCount: argu('votesConCount'),
  votesNeutralCount: argu('votesNeutralCount'),
  votesProCount: argu('votesProCount'),
  yes: argu('yes'),

  /* datatypes */
  // eslint-disable-next-line sort-keys
  base64File: argu('base64File'),

  /*
   * topologies
   * Use the exported constants over these.
   */

  // eslint-disable-next-line sort-keys
  actionsBar: argu('actionsBar'),
  card: argu('card'),
  cardFixed: argu('cardFixed'),
  cardMain: argu('cardMain'),
  cartDetails: argu('cartDetails'),
  container: argu('container'),
  detail: argu('detail'),
  formFooter: argu('formFooter'),
  fullResource: argu('fullResource'),
  grid: argu('grid'),
  inline: argu('inline'),
  tabPane: argu('tabPane'),
  void: argu('void'),
  voteEvent: argu('voteEvent'),
  widget: argu('widget'),
};
