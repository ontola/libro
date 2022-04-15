import rdf from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import { DataRecord } from 'link-lib';

export interface Value {
  type: 'id' | 'lid' | 'p' | 's' | 'dt' | 'b' | 'i' | 'l' | 'ls';
  v: string;
}

export interface GlobalId extends Value {
  type: 'id';
  v: string;
}

export interface LocalId extends Value {
  type: 'lid';
  v: string;
}

export interface Primitive extends Value {
  type: 'p';
  v: string;
  dt: string;
}

export interface String extends Value {
  type: 's';
  v: string;
}

export interface Boolean extends Value {
  type: 'b';
  v: string;
}

export interface Int extends Value {
  type: 'i';
  v: string;
}

export interface Long extends Value {
  type: 'l';
  v: string;
}

export interface DateTime extends Value {
  type: 'dt';
  v: string;
}

export interface LangString extends Value {
  type: 'ls';
  v: string;
  l: string;
}

export type Identifyable = { _id: GlobalId | LocalId };
export type Fields = Record<string, Value[]>;

export type SeedDataRecord = Identifyable & Fields;

export type Seed = Record<string, SeedDataRecord>;

export type Slice = Record<string, DataRecord>;

const dataTypes = ['id', 'lid', 'p', 's', 'dt', 'b', 'i', 'l', 'ls'];

const valueToStoreValue = (v: Value, websiteIRI: string | undefined) => {
  switch (v.type) {
  case 'id': {
    if (v.v === '/') {
      return rdf.namedNode(websiteIRI ?? '');
    }

    if (v.v.startsWith('/')) {
      return rdf.namedNode((websiteIRI ?? '') + v.v);
    }

    return rdf.namedNode(mapping[v.v] ? mapping[v.v] : v.v);
  }

  case 'lid': return rdf.blankNode(v.v);
  case 'p': return rdf.literal(v.v, rdf.namedNode((v as Primitive).dt));
  case 'ls': return rdf.literal(v.v, (v as LangString).l);
  case 's': return rdf.literal(v.v, xsd.string);
  case 'b': return rdf.literal(v.v, xsd.xsdboolean);
  case 'i': return rdf.literal(v.v, xsd.integer);
  case 'l': return rdf.literal(v.v, xsd.xsdlong);
  case 'dt': return rdf.literal(v.v, xsd.dateTime);
  }
};

const getValue = (value: any, websiteIRI: string | undefined) => {
  if (!Array.isArray(value) && Object.hasOwnProperty.call(value, 'type') && dataTypes.includes(value.type)) {
    return valueToStoreValue(value, websiteIRI);
  }

  if (value.length === 1) {
    return value[0];
  }

  return value;
};

const keyOverride = (key: string, value: any, websiteIRI: string | undefined) => {
  if (websiteIRI && key.startsWith('/')) {
    return `${websiteIRI}${key}`;
  }

  if (key === 'type' && dataTypes.includes(value)) {
    return undefined;
  }

  return mapping[key];
};

export const seedToSlice = (initialData: string | undefined, websiteIRI: string | undefined = undefined): Slice => {
  if (initialData === undefined) {
    return {};
  }

  return JSON.parse(initialData, function(key: string, value: any) {
    const nextValue = getValue(value, websiteIRI);
    const differentKey = keyOverride(key, value, websiteIRI);

    if (differentKey) {
      // eslint-disable-next-line no-invalid-this
      this[differentKey] = nextValue;

      return undefined;
    }

    return nextValue;
  });
};

const custom = {
  _0: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_0',

  Class: 'http://www.w3.org/2000/01/rdf-schema#Class',
  CreativeWork: 'http://schema.org/CreativeWork',
  Field: 'https://ns.ontola.io/form#Field',
  Property: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property',
  Thing: 'http://schema.org/Thing',
  domainIncludes: 'http://schema.org/domainIncludes',
  isDefinedBy: 'http://www.w3.org/2000/01/rdf-schema#isDefinedBy',
  name: 'http://schema.org/name',
  rangeIncludes: 'http://schema.org/rangeIncludes',
  rdfscomment: 'http://www.w3.org/2000/01/rdf-schema#comment',
};

const mapping: Record<string, string> = {
  ...custom,

  Destroy: 'https://ns.ontola.io/core#_destroy',
  acceptTerms: 'https://argu.co/ns/core#acceptTerms',
  acceptedTerms: 'https://argu.co/ns/core#acceptedTerms',
  action: 'https://ns.ontola.io/core#action',
  actionBody: 'http://purl.org/link-lib/actionBody',
  actionName: 'https://argu.co/ns/core#actionName',
  actionStatus: 'http://schema.org/actionStatus',
  actionsMenu: 'https://ns.ontola.io/core#actionsMenu',
  actor: 'https://ns.ontola.io/core#actor',
  actorType: 'https://ns.ontola.io/core#actorType',
  additionalIntroductionInformation: 'https://argu.co/ns/rivm#additionalIntroductionInformation',
  addressCountry: 'http://schema.org/addressCountry',
  alias: 'https://argu.co/ns/core#alias',
  allowedExternalSources: 'https://ns.ontola.io/core#allowedExternalSources',
  and: 'http://www.w3.org/ns/shacl#and',
  anonymous: 'https://argu.co/ns/core#anonymous',
  arguPublication: 'https://argu.co/ns/core#arguPublication',
  argumentColumns: 'https://argu.co/ns/core#argumentColumns',
  attachmentPublicationDate: 'https://argu.co/ns/rivm#attachmentPublicationDate',
  attachments: 'https://argu.co/ns/core#attachments',
  audience: 'https://ns.ontola.io/core#audience',
  banners: 'https://ns.ontola.io/core#banners',
  bannersManagement: 'https://ns.ontola.io/core#bannersManagement',
  baseCollection: 'https://ns.ontola.io/core#baseCollection',
  blogPosts: 'https://argu.co/ns/core#blogPosts',
  budgetMax: 'https://argu.co/ns/core#budgetMax',
  budgetShops: 'https://argu.co/ns/core#budgetShops',
  businessSection: 'https://argu.co/ns/rivm#businessSection',
  businessSectionEmployees: 'https://argu.co/ns/rivm#businessSectionEmployees',
  caption: 'http://schema.org/caption',
  cart: 'https://argu.co/ns/core#cart',
  cartDetail: 'https://argu.co/ns/core#cartDetail',
  cartDetails: 'https://argu.co/ns/core#cartDetails',
  categories: 'https://argu.co/ns/rivm#categories',
  checkoutAction: 'https://argu.co/ns/core#checkoutAction',
  childrenPlacements: 'https://argu.co/ns/core#childrenPlacements',
  class: 'http://www.w3.org/ns/shacl#class',
  closeMatch: 'http://www.w3.org/2004/02/skos/core#closeMatch',
  closed: 'http://www.w3.org/ns/shacl#closed',
  collapsible: 'https://ns.ontola.io/form#collapsible',
  collectionDisplay: 'https://ns.ontola.io/core#collectionDisplay',
  color: 'http://schema.org/color',
  comment: 'http://schema.org/comment',
  commentsAllowed: 'https://argu.co/ns/rivm#commentsAllowed',
  commentsCount: 'https://argu.co/ns/core#commentsCount',
  communicateAction: 'https://argu.co/ns/core#communicateAction',
  communication: 'https://argu.co/ns/rivm#communication',
  competence: 'https://argu.co/ns/rivm#competence',
  component: 'http://purl.org/linked-data/cube#component',
  conArguments: 'https://argu.co/ns/core#conArguments',
  conArgumentsCount: 'https://argu.co/ns/core#conArgumentsCount',
  confirmationString: 'https://argu.co/ns/core#confirmationString',
  confirmed: 'https://argu.co/ns/core#confirmed',
  confirmedAt: 'https://argu.co/ns/core#confirmedAt',
  conflictAndPrioritization: 'https://argu.co/ns/rivm#conflictAndPrioritization',
  contactAllowed: 'https://argu.co/ns/rivm#contactAllowed',
  contactInfo: 'https://argu.co/ns/rivm#contactInfo',
  contentSource: 'https://argu.co/ns/core#contentSource',
  contentUrl: 'http://schema.org/contentUrl',
  continuous: 'https://argu.co/ns/rivm#continuous',
  convertToClass: 'https://argu.co/ns/core#convertToClass',
  convertibleClasses: 'https://argu.co/ns/core#convertibleClasses',
  copyUrl: 'https://argu.co/ns/core#copyUrl',
  costExplanation: 'https://argu.co/ns/rivm#costExplanation',
  coupon: 'https://argu.co/ns/core#coupon',
  couponBatches: 'https://argu.co/ns/core#couponBatches',
  couponCount: 'https://argu.co/ns/core#couponCount',
  coupons: 'https://argu.co/ns/core#coupons',
  coverPhoto: 'https://ns.ontola.io/core#coverPhoto',
  createBlogPostPermission: 'https://argu.co/ns/core#createBlogPostPermission',
  createCommentPermission: 'https://argu.co/ns/core#createCommentPermission',
  createConArgumentPermission: 'https://argu.co/ns/core#createConArgumentPermission',
  createForumPermission: 'https://argu.co/ns/core#createForumPermission',
  createMotionPermission: 'https://argu.co/ns/core#createMotionPermission',
  createPermission: 'https://argu.co/ns/core#createPermission',
  createProArgumentPermission: 'https://argu.co/ns/core#createProArgumentPermission',
  createQuestionPermission: 'https://argu.co/ns/core#createQuestionPermission',
  createVote: 'https://argu.co/ns/core#createVote',
  createVotePermission: 'https://argu.co/ns/core#createVotePermission',
  creativeWorkType: 'https://argu.co/ns/core#CreativeWorkType',
  creativeWorks: 'https://argu.co/ns/core#creative_works',
  creator: 'http://schema.org/creator',
  currentPassword: 'https://argu.co/ns/core#currentPassword',
  currentPhase: 'https://argu.co/ns/core#currentPhase',
  currentVote: 'https://argu.co/ns/core#currentVote',
  customActions: 'https://argu.co/ns/core#customActions',
  customFormFields: 'https://argu.co/ns/core#customFormFields',
  dataSet: 'http://purl.org/linked-data/cube#dataSet',
  datatype: 'http://www.w3.org/ns/shacl#datatype',
  dateCreated: 'http://schema.org/dateCreated',
  dateModified: 'http://schema.org/dateModified',
  datePublished: 'http://schema.org/datePublished',
  dateRead: 'http://schema.org/dateRead',
  dbSchema: 'https://argu.co/ns/core#dbSchema',
  deactivated: 'http://www.w3.org/ns/shacl#deactivated',
  decisionState: 'https://argu.co/ns/core#decisionState',
  decisionsEmails: 'https://argu.co/ns/core#decisionsEmails',
  defaultDisplay: 'https://argu.co/ns/core#defaultDisplay',
  defaultOptionsVocab: 'https://argu.co/ns/core#defaultOptionsVocab',
  defaultSorting: 'https://argu.co/ns/core#defaultSorting',
  defaultValue: 'https://ns.ontola.io/form#defaultValue',
  description: 'http://www.w3.org/ns/shacl#description',
  destination: 'https://argu.co/ns/core#destination',
  destroyPermission: 'https://argu.co/ns/core#destroyPermission',
  destroyStrategy: 'https://argu.co/ns/core#destroyStrategy',
  dimension: 'http://purl.org/linked-data/cube#dimension',
  discoverable: 'https://argu.co/ns/core#discoverable',
  discussions: 'https://argu.co/ns/core#discussions',
  disjoint: 'http://www.w3.org/ns/shacl#disjoint',
  dismissAction: 'https://ns.ontola.io/core#dismissAction',
  dismissButton: 'https://ns.ontola.io/core#dismissButton',
  downloadUrl: 'http://schema.org/downloadUrl',
  draft: 'https://argu.co/ns/core#draft',
  edge: 'https://argu.co/ns/core#edge',
  effectivityResearchMethod: 'https://argu.co/ns/rivm#effectivityResearchMethod',
  email: 'http://schema.org/email',
  emailAddresses: 'https://argu.co/ns/core#emailAddresses',
  emails: 'https://argu.co/ns/core#emails',
  embedUrl: 'http://schema.org/embedUrl',
  encodingFormat: 'http://schema.org/encodingFormat',
  endDate: 'http://schema.org/endDate',
  equals: 'http://www.w3.org/ns/shacl#equals',
  ergonomics: 'https://argu.co/ns/rivm#ergonomics',
  error: 'http://schema.org/error',
  exactMatch: 'http://www.w3.org/2004/02/skos/core#exactMatch',
  expiresAt: 'https://argu.co/ns/core#expiresAt',
  explanation: 'https://argu.co/ns/core#explanation',
  exportStatus: 'https://argu.co/ns/core#exportStatus',
  externalIRI: 'https://argu.co/ns/core#externalIRI',
  fail: 'https://ns.ontola.io/core#fail',
  favoriteAction: 'https://ns.ontola.io/core#favoriteAction',
  fields: 'https://ns.ontola.io/form#fields',
  fileUsage: 'https://argu.co/ns/core#fileUsage',
  filename: 'http://dbpedia.org/ontology/filename',
  filterCount: 'https://ns.ontola.io/core#filterCount',
  filterKey: 'https://ns.ontola.io/core#filterKey',
  filterOptions: 'https://ns.ontola.io/core#filterOptions',
  filterOptionsIn: 'https://ns.ontola.io/core#filterOptionsIn',
  filterValue: 'https://ns.ontola.io/core#filterValue',
  flags: 'http://www.w3.org/ns/shacl#flags',
  followMenu: 'https://ns.ontola.io/core#followMenu',
  followsCount: 'https://argu.co/ns/core#followsCount',
  footerGroup: 'https://ns.ontola.io/form#footerGroup',
  forceRender: 'http://purl.org/link-lib/forceRender',
  form: 'https://ns.ontola.io/form#form',
  formFieldType: 'https://argu.co/ns/core#formFieldType',
  formType: 'https://argu.co/ns/core#formType',
  'forms::Inputs::Select::Displayprop': 'https://ns.ontola.io/core#forms/inputs/select/displayProp',
  forums: 'https://argu.co/ns/core#forums',
  geo: 'http://schema.org/geo',
  geoCoordinates: 'https://argu.co/ns/core#geoCoordinates',
  googleTagManager: 'https://ns.ontola.io/core#googleTagManager',
  googleUac: 'https://ns.ontola.io/core#googleUac',
  grantSet: 'https://argu.co/ns/core#grantSet',
  grantSetKey: 'https://argu.co/ns/core#grantSetKey',
  grantSets: 'https://argu.co/ns/core#grantSets',
  grantedGroups: 'https://argu.co/ns/core#grantedGroups',
  grantedSets: 'https://argu.co/ns/core#grantedSets',
  grants: 'https://argu.co/ns/core#grants',
  group: 'http://www.w3.org/ns/shacl#group',
  groupBy: 'https://ns.ontola.io/core#groupBy',
  groupId: 'https://argu.co/ns/core#groupId',
  groupedOptions: 'https://ns.ontola.io/form#groupedOptions',
  groups: 'https://ns.ontola.io/form#groups',
  hasAnalytics: 'https://argu.co/ns/core#hasAnalytics',
  hasMember: 'http://www.w3.org/ns/org#hasMember',
  hasValue: 'http://www.w3.org/ns/shacl#hasValue',
  headerBackground: 'https://argu.co/ns/core#headerBackground',
  headerText: 'https://argu.co/ns/core#headerText',
  helperText: 'https://ns.ontola.io/core#helperText',
  hidden: 'https://ns.ontola.io/form#hidden',
  hideHeader: 'https://ns.ontola.io/core#hideHeader',
  hideLanguageSwitcher: 'https://ns.ontola.io/core#hideLanguageSwitcher',
  homeLocation: 'http://schema.org/homeLocation',
  homeMenuImage: 'https://ns.ontola.io/core#homeMenuImage',
  homeMenuLabel: 'https://ns.ontola.io/core#homeMenuLabel',
  homepage: 'http://xmlns.com/foaf/0.1/homepage',
  href: 'https://ns.ontola.io/core#href',
  httpMethod: 'http://schema.org/httpMethod',
  identifier: 'http://schema.org/identifier',
  ignoredProperties: 'http://www.w3.org/ns/shacl#ignoredProperties',
  image: 'http://schema.org/image',
  imagePositionY: 'https://ns.ontola.io/core#imagePositionY',
  imgUrl64x64: 'https://ns.ontola.io/core#imgUrl64x64',
  imgUrl256x256: 'https://ns.ontola.io/core#imgUrl256x256',
  imgUrl568x400: 'https://ns.ontola.io/core#imgUrl568x400',
  imgUrl1500x2000: 'https://ns.ontola.io/core#imgUrl1500x2000',
  important: 'https://argu.co/ns/core#important',
  in: 'http://www.w3.org/ns/shacl#in',
  inReplyTo: 'https://argu.co/ns/core#inReplyTo',
  independent: 'https://argu.co/ns/rivm#independent',
  industry: 'http://schema.org/industry',
  interventionEffects: 'https://argu.co/ns/rivm#interventionEffects',
  interventionGoal: 'https://argu.co/ns/rivm#interventionGoal',
  interventions: 'https://argu.co/ns/rivm#interventions',
  interventionsCount: 'https://argu.co/ns/core#interventionsCount',
  introFinished: 'https://argu.co/ns/core#introFinished',
  invertArguments: 'https://argu.co/ns/core#invertArguments',
  isDraft: 'https://argu.co/ns/core#isDraft',
  isPartOf: 'http://schema.org/isPartOf',
  itemOffered: 'http://schema.org/itemOffered',
  items: 'https://www.w3.org/ns/activitystreams#items',
  label: 'http://www.w3.org/2000/01/rdf-schema#label',
  language: 'http://schema.org/language',
  languageIn: 'http://www.w3.org/ns/shacl#languageIn',
  lastActivityAt: 'https://argu.co/ns/core#lastActivityAt',
  latitude: 'http://schema.org/latitude',
  lessThan: 'http://www.w3.org/ns/shacl#lessThan',
  lessThanOrEquals: 'http://www.w3.org/ns/shacl#lessThanOrEquals',
  liveUpdates: 'https://ns.ontola.io/core#liveUpdates',
  locale: 'https://argu.co/ns/core#locale',
  location: 'http://schema.org/location',
  locationQuery: 'https://argu.co/ns/core#locationQuery',
  longitude: 'http://schema.org/longitude',
  managementInvolvement: 'https://argu.co/ns/rivm#managementInvolvement',
  mapQuestion: 'https://argu.co/ns/core#mapQuestion',
  markAsImportant: 'https://argu.co/ns/core#markAsImportant',
  matomoHost: 'https://ns.ontola.io/core#matomoHost',
  matomoSiteId: 'https://ns.ontola.io/core#matomoSiteId',
  maxCount: 'https://ns.ontola.io/core#maxCount',
  maxExclusive: 'http://www.w3.org/ns/shacl#maxExclusive',
  maxInclusive: 'https://ns.ontola.io/core#maxInclusive',
  maxInclusiveLabel: 'https://ns.ontola.io/core#maxInclusiveLabel',
  maxLength: 'https://ns.ontola.io/core#maxLength',
  measure: 'http://purl.org/linked-data/cube#measure',
  measureOwner: 'https://argu.co/ns/rivm#measureOwner',
  member: 'http://www.w3.org/ns/org#member',
  memberOf: 'http://www.w3.org/ns/org#memberOf',
  menuItems: 'https://ns.ontola.io/core#menuItems',
  menuLabel: 'https://argu.co/ns/core#menuLabel',
  menus: 'https://ns.ontola.io/core#menus',
  message: 'http://www.w3.org/ns/shacl#message',
  minCount: 'https://ns.ontola.io/core#minCount',
  minExclusive: 'http://www.w3.org/ns/shacl#minExclusive',
  minInclusive: 'https://ns.ontola.io/core#minInclusive',
  minInclusiveLabel: 'https://ns.ontola.io/core#minInclusiveLabel',
  minLength: 'https://ns.ontola.io/core#minLength',
  moreInfo: 'https://argu.co/ns/rivm#moreInfo',
  motions: 'https://argu.co/ns/core#motions',
  motionsCount: 'https://argu.co/ns/core#motionsCount',
  motivationAndCommitment: 'https://argu.co/ns/rivm#motivationAndCommitment',
  mountAction: 'https://ns.ontola.io/core#mountAction',
  moveTo: 'https://argu.co/ns/core#moveTo',
  nameSingular: 'https://argu.co/ns/core#nameSingular',
  natureOfCosts: 'https://argu.co/ns/rivm#natureOfCosts',
  navigationsMenu: 'https://ns.ontola.io/core#navigationsMenu',
  newsEmails: 'https://argu.co/ns/core#newsEmails',
  next: 'https://www.w3.org/ns/activitystreams#next',
  node: 'http://www.w3.org/ns/shacl#node',
  nodeKind: 'http://www.w3.org/ns/shacl#nodeKind',
  not: 'http://www.w3.org/ns/shacl#not',
  object: 'https://www.w3.org/ns/activitystreams#object',
  observation: 'http://purl.org/linked-data/cube#observation',
  offers: 'https://argu.co/ns/core#offers',
  oneClick: 'https://ns.ontola.io/core#oneClick',
  oneOffCosts: 'https://argu.co/ns/rivm#oneOffCosts',
  oneOffCostsScore: 'https://argu.co/ns/rivm#oneOffCostsScore',
  option: 'http://schema.org/option',
  optionsVocab: 'https://argu.co/ns/core#optionsVocab',
  or: 'http://www.w3.org/ns/shacl#or',
  order: 'http://purl.org/linked-data/cube#order',
  orderDetails: 'https://argu.co/ns/core#orderDetails',
  orderedItem: 'http://schema.org/orderedItem',
  orders: 'https://argu.co/ns/core#orders',
  organization: 'https://ns.ontola.io/core#organization',
  organizationName: 'https://argu.co/ns/rivm#organizationName',
  otp: 'https://argu.co/ns/core#otp',
  otpActive: 'https://ns.ontola.io/core#otpActive',
  parentMenu: 'https://ns.ontola.io/core#parentMenu',
  partOf: 'https://www.w3.org/ns/activitystreams#partOf',
  pass: 'https://ns.ontola.io/core#pass',
  password: 'https://ns.ontola.io/core#password',
  passwordConfirmation: 'https://ns.ontola.io/core#passwordConfirmation',
  path: 'http://www.w3.org/ns/shacl#path',
  pattern: 'http://www.w3.org/ns/shacl#pattern',
  pdfPage: 'https://argu.co/ns/core#pdfPage',
  pdfPositionX: 'https://argu.co/ns/core#pdfPositionX',
  pdfPositionY: 'https://argu.co/ns/core#pdfPositionY',
  peopleAndResources: 'https://argu.co/ns/rivm#peopleAndResources',
  permission: 'https://argu.co/ns/core#permission',
  permissionGroups: 'https://argu.co/ns/core#permissionGroups',
  permittedAction: 'https://argu.co/ns/core#permittedAction',
  phases: 'https://argu.co/ns/rivm#phases',
  photoAttribution: 'https://argu.co/ns/core#photoAttribution',
  pinned: 'https://argu.co/ns/core#pinned',
  pinnedAt: 'https://argu.co/ns/core#pinnedAt',
  piwikProHost: 'https://ns.ontola.io/core#piwikProHost',
  piwikProSiteId: 'https://ns.ontola.io/core#piwikProSiteId',
  placeholder: 'https://ns.ontola.io/form#placeholder',
  placementType: 'https://argu.co/ns/core#placementType',
  plansAndProcedure: 'https://argu.co/ns/rivm#plansAndProcedure',
  pluralLabel: 'https://ns.ontola.io/core#pluralLabel',
  postalCode: 'http://schema.org/postalCode',
  predicate: 'https://argu.co/ns/core#predicate',
  prev: 'https://www.w3.org/ns/activitystreams#prev',
  price: 'https://argu.co/ns/core#price',
  priceCurrency: 'http://schema.org/priceCurrency',
  primaryColor: 'https://argu.co/ns/core#primaryColor',
  primaryEmail: 'https://argu.co/ns/core#primaryEmail',
  primaryVote: 'https://argu.co/ns/core#primaryVote',
  proArguments: 'https://argu.co/ns/core#proArguments',
  proArgumentsCount: 'https://argu.co/ns/core#proArgumentsCount',
  profile: 'https://argu.co/ns/core#profile',
  projects: 'https://argu.co/ns/core#projects',
  property: 'http://www.w3.org/ns/shacl#property',
  public: 'https://argu.co/ns/core#public',
  published: 'https://www.w3.org/ns/activitystreams#published',
  qualifiedMaxCount: 'http://www.w3.org/ns/shacl#qualifiedMaxCount',
  qualifiedMinCount: 'http://www.w3.org/ns/shacl#qualifiedMinCount',
  qualifiedValueShape: 'http://www.w3.org/ns/shacl#qualifiedValueShape',
  questions: 'https://argu.co/ns/core#questions',
  rawDescription: 'https://argu.co/ns/core#rawDescription',
  rawHref: 'https://argu.co/ns/core#rawHref',
  rawImage: 'https://argu.co/ns/core#rawImage',
  rawResource: 'https://argu.co/ns/core#rawResource',
  rawSubmitLabel: 'https://argu.co/ns/core#rawSubmitLabel',
  reactionsEmails: 'https://argu.co/ns/core#reactionsEmails',
  recurringCosts: 'https://argu.co/ns/rivm#recurringCosts',
  recurringCostsScore: 'https://argu.co/ns/rivm#recurringCostsScore',
  redirectUrl: 'https://ns.ontola.io/core#redirectUrl',
  remoteContentUrl: 'https://argu.co/ns/core#remoteContentUrl',
  require2fa: 'https://argu.co/ns/core#require2fa',
  requireCoupon: 'https://argu.co/ns/core#requireCoupon',
  requireLocation: 'https://argu.co/ns/core#requireLocation',
  requiresIntro: 'https://ns.ontola.io/core#requiresIntro',
  resetPasswordToken: 'https://ns.ontola.io/core#resetPasswordToken',
  resource: 'https://argu.co/ns/core#resource',
  resourceType: 'https://argu.co/ns/core#resourceType',
  result: 'http://schema.org/result',
  reward: 'https://argu.co/ns/core#reward',
  riskReduction: 'https://argu.co/ns/rivm#riskReduction',
  roleName: 'http://schema.org/roleName',
  rootId: 'https://argu.co/ns/core#rootId',
  sameAs: 'http://www.w3.org/2002/07/owl#sameAs',
  secondOpinion: 'https://argu.co/ns/rivm#secondOpinion',
  secondOpinionBy: 'https://argu.co/ns/rivm#secondOpinionBy',
  secondaryColor: 'https://argu.co/ns/core#secondaryColor',
  securityImproved: 'https://argu.co/ns/rivm#securityImproved',
  securityImprovedScore: 'https://argu.co/ns/rivm#securityImprovedScore',
  securityImprovementReason: 'https://argu.co/ns/rivm#securityImprovementReason',
  sendMail: 'https://argu.co/ns/core#sendMail',
  sendNotifications: 'https://argu.co/ns/core#sendNotifications',
  sessionID: 'https://argu.co/ns/core#sessionID',
  sessionMenu: 'https://ns.ontola.io/core#sessionMenu',
  settingsMenu: 'https://ns.ontola.io/core#settingsMenu',
  severity: 'http://www.w3.org/ns/shacl#severity',
  shIn: 'https://ns.ontola.io/core#shIn',
  shareMenu: 'https://ns.ontola.io/core#shareMenu',
  shortname: 'https://argu.co/ns/core#shortname',
  shortnameable: 'https://argu.co/ns/core#shortnameable',
  showHeader: 'https://argu.co/ns/core#showHeader',
  showPermission: 'https://argu.co/ns/core#showPermission',
  sortDirection: 'https://ns.ontola.io/core#sortDirection',
  sortKey: 'https://ns.ontola.io/core#sortKey',
  sparql: 'http://www.w3.org/ns/shacl#sparql',
  startDate: 'http://schema.org/startDate',
  structure: 'http://purl.org/linked-data/cube#structure',
  styledHeaders: 'https://ns.ontola.io/core#styledHeaders',
  subClassOf: 'http://www.w3.org/2000/01/rdf-schema#subClassOf',
  submissionData: 'https://argu.co/ns/core#submissionData',
  submissionStatus: 'https://argu.co/ns/core#submissionStatus',
  surveys: 'https://argu.co/ns/core#surveys',
  svg: 'https://ns.ontola.io/core#svg',
  system: 'https://argu.co/ns/core#system',
  tabsMenu: 'https://ns.ontola.io/core#tabsMenu',
  taggedLabel: 'https://argu.co/ns/core#taggedLabel',
  taggings: 'https://argu.co/ns/core#taggings',
  target: 'https://www.w3.org/ns/activitystreams#target',
  targetAudience: 'https://argu.co/ns/rivm#targetAudience',
  targetClass: 'http://www.w3.org/ns/shacl#targetClass',
  targetNode: 'http://www.w3.org/ns/shacl#targetNode',
  targetObjectsOf: 'http://www.w3.org/ns/shacl#targetObjectsOf',
  targetSubjectsOf: 'http://www.w3.org/ns/shacl#targetSubjectsOf',
  template: 'https://ns.ontola.io/core#template',
  templateOpts: 'https://ns.ontola.io/core#templateOpts',
  termType: 'https://argu.co/ns/core#termType',
  terms: 'https://argu.co/ns/core#terms',
  text: 'http://schema.org/text',
  thumbnail: 'http://schema.org/thumbnail',
  time: 'https://argu.co/ns/core#time',
  timeZone: 'http://www.w3.org/2006/time#timeZone',
  tools: 'https://argu.co/ns/rivm#tools',
  topComment: 'https://argu.co/ns/core#topComment',
  topics: 'https://argu.co/ns/core#topics',
  topology: 'https://ns.ontola.io/core#topology',
  totalItems: 'https://www.w3.org/ns/activitystreams#totalItems',
  totalPaymentDue: 'http://schema.org/totalPaymentDue',
  trainingRequired: 'https://argu.co/ns/rivm#trainingRequired',
  transferTo: 'https://argu.co/ns/core#transferTo',
  trashActivity: 'https://argu.co/ns/core#trashActivity',
  trashPermission: 'https://argu.co/ns/core#trashPermission',
  trashed: 'https://argu.co/ns/core#trashed',
  trashedAt: 'https://argu.co/ns/core#trashedAt',
  type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  uniqueLang: 'http://www.w3.org/ns/shacl#uniqueLang',
  unread: 'https://argu.co/ns/core#unread',
  unreadCount: 'https://argu.co/ns/core#unreadCount',
  unscoped: 'https://argu.co/ns/core#unscoped',
  untrashActivity: 'https://argu.co/ns/core#untrashActivity',
  updatePermission: 'https://argu.co/ns/core#updatePermission',
  updated: 'https://www.w3.org/ns/activitystreams#updated',
  uploadDate: 'http://schema.org/uploadDate',
  url: 'http://schema.org/url',
  usedCoupons: 'https://argu.co/ns/core#usedCoupons',
  user: 'https://argu.co/ns/core#user',
  userMenu: 'https://ns.ontola.io/core#userMenu',
  view: 'https://argu.co/ns/core#view',
  visible: 'https://ns.ontola.io/core#visible',
  voteEvents: 'https://argu.co/ns/core#voteEvents',
  voteOptions: 'https://argu.co/ns/core#voteOptions',
  voteableVoteEvent: 'https://argu.co/ns/core#voteableVoteEvent',
  votes: 'https://argu.co/ns/core#votes',
  votesConCount: 'https://argu.co/ns/core#votesConCount',
  votesNeutralCount: 'https://argu.co/ns/core#votesNeutralCount',
  votesProCount: 'https://argu.co/ns/core#votesProCount',
  votesPublic: 'https://argu.co/ns/core#votesPublic',
  widgetResource: 'https://ns.ontola.io/core#widgetResource',
  widgetSize: 'https://ns.ontola.io/core#widgetSize',
  widgets: 'https://ns.ontola.io/core#widgets',
  xone: 'http://www.w3.org/ns/shacl#xone',
  zoomLevel: 'https://ns.ontola.io/core#zoomLevel',
};
