import { createNS } from '@ontologies/core';

const ontola = createNS('https://ns.ontola.io/core#');

export default {
  ns: ontola,

  /* classes */
  // eslint-disable-next-line sort-keys
  Banner: ontola('Banner'),
  Collection: ontola('Collection'),
  CollectionFilter: ontola('CollectionFilter'),
  CollectionSorting: ontola('CollectionSorting'),
  CollectionView: ontola('CollectionView'),
  Condition: ontola('Condition'),
  Confirmation: ontola('Confirmation'),
  ConfirmedUser: ontola('ConfirmedUser'),
  ['Create::Auth::AccessToken']: ontola('Create::Auth::AccessToken'),
  ['Create::Auth::Confirmation']: ontola('Create::Auth::Confirmation'),
  ['Create::Auth::Password']: ontola('Create::Auth::Password'),
  ['Create::Auth::Session']: ontola('Create::Auth::Session'),
  ['Create::Auth::Unlock']: ontola('Create::Auth::Unlock'),
  ['Create::FollowUp']: ontola('Create::FollowUp'),
  ['Create::MediaObject']: ontola('Create::MediaObject'),
  ['Create::User']: ontola('Create::User'),
  ['Create::Vote']: ontola('Create::Vote'),
  CreateVoteAction: ontola('CreateVoteAction'),
  DestroyVoteAction: ontola('DestroyVoteAction'),
  DisabledActionStatus: ontola('DisabledActionStatus'),
  ExpiredActionStatus: ontola('ExpiredActionStatus'),
  Filter: ontola('Filter'),
  FilterField: ontola('FilterField'),
  FilterOption: ontola('FilterOption'),
  FormOption: ontola('FormOption'),
  FormStep: ontola('FormStep'),
  GuestUser: ontola('GuestUser'),
  InfiniteView: ontola('InfiniteView'),
  LockedActionStatus: ontola('LockedActionStatus'),
  LottieAnimation: ontola('LottieAnimation'),
  MenuItem: ontola('MenuItem'),
  Ontology: ontola('Ontology'),
  PaginatedView: ontola('PaginatedView'),
  PictureSet: ontola('PictureSet'),
  PropertyQuery: ontola('PropertyQuery'),
  SearchResult: ontola('SearchResult'),
  Sorting: ontola('Sorting'),
  UnconfirmedUser: ontola('UnconfirmedUser'),
  VideoSet: ontola('VideoSet'),
  Widget: ontola('Widget'),

  /* properties */
  // eslint-disable-next-line sort-keys
  _destroy: ontola('_destroy'),
  action: ontola('action'),
  actionDialog: ontola('actionDialog'),
  actionsMenu: ontola('actionsMenu'),
  activeFilters: ontola('activeFilters'),
  actor: ontola('actor'),
  actorType: ontola('actorType'),
  alt: ontola('alt'),
  ariaLabel: ontola('ariaLabel'),
  baseCollection: ontola('baseCollection'),
  breadcrumb: ontola('breadcrumb'),
  callToAction: ontola('callToAction'),
  claimRewardAction: ontola('claimRewardAction'),
  collectionDisplay: ontola('collectionDisplay'),
  ['collectionDisplay/card']: ontola('collectionDisplay/card'),
  ['collectionDisplay/default']: ontola('collectionDisplay/default'),
  ['collectionDisplay/grid']: ontola('collectionDisplay/grid'),
  ['collectionDisplay/settingsTable']: ontola('collectionDisplay/settingsTable'),
  ['collectionDisplay/table']: ontola('collectionDisplay/table'),
  collectionFrame: ontola('collectionFrame'),
  collectionSorting: ontola('collectionSorting'),
  collectionType: ontola('collectionType'),
  ['collectionType/infinite']: ontola('collectionType/infinite'),
  ['collectionType/paginated']: ontola('collectionType/paginated'),
  columns: ontola('columns'),
  contains: ontola('contains'),
  coverPhoto: ontola('coverPhoto'),
  createAction: ontola('createAction'),
  createSubmissionAction: ontola('createSubmissionAction'),
  defaultPagination: ontola('defaultPagination'),
  defaultType: ontola('defaultType'),
  destroyAction: ontola('destroyAction'),
  dismissAction: ontola('dismissAction'),
  dismissButton: ontola('dismissButton'),
  dismissedAt: ontola('dismissedAt'),
  fail: ontola('fail'),
  favoriteAction: ontola('favoriteAction'),
  filterCount: ontola('filterCount'),
  filterFields: ontola('filterFields'),
  filterKey: ontola('filterKey'),
  filterOptions: ontola('filterOptions'),
  filterOptionsIn: ontola('filterOptionsIn'),
  filterValue: ontola('filterValue'),
  followMenu: ontola('followMenu'),
  formSteps: ontola('formSteps'),
  ['format/apng']: ontola('format/apng'),
  ['format/avif']: ontola('format/avif'),
  ['format/gif']: ontola('format/gif'),
  ['format/jpg']: ontola('format/jpg'),
  ['format/mov']: ontola('format/mov'),
  ['format/mp4']: ontola('format/mp4'),
  ['format/png']: ontola('format/png'),
  ['format/svg']: ontola('format/svg'),
  ['format/webm']: ontola('format/webm'),
  ['format/webp']: ontola('format/webp'),
  ['forms/inputs/select/displayProp']: ontola('forms/inputs/select/displayProp'),
  geometryType: ontola('geometryType'),
  groupBy: ontola('groupBy'),
  header: ontola('header'),
  hideHeader: ontola('hideHeader'),
  href: ontola('href'),
  imagePositionY: ontola('imagePositionY'),
  imgUrl64x64: ontola('imgUrl64x64'),
  imgUrl256x256: ontola('imgUrl256x256'),
  imgUrl568x400: ontola('imgUrl568x400'),
  imgUrl1500x2000: ontola('imgUrl1500x2000'),
  infinitePagination: ontola('infinitePagination'),
  invalidate: ontola('invalidate'),
  iriTemplate: ontola('iriTemplate'),
  iriTemplateOpts: ontola('iriTemplateOpts'),
  makePrimaryAction: ontola('makePrimaryAction'),
  maxColumns: ontola('grid/maxColumns'),
  maxCount: ontola('maxCount'),
  maxInclusive: ontola('maxInclusive'),
  maxInclusiveLabel: ontola('maxInclusiveLabel'),
  memberships: ontola('memberships'),
  menuItems: ontola('menuItems'),
  menus: ontola('menus'),
  minCount: ontola('minCount'),
  minInclusive: ontola('minInclusive'),
  minInclusiveLabel: ontola('minInclusiveLabel'),
  minLength: ontola('minLength'),
  mountAction: ontola('mountAction'),
  moveDownAction: ontola('moveDownAction'),
  moveUpAction: ontola('moveUpAction'),
  navigationsMenu: ontola('navigationsMenu'),
  oneClick: ontola('oneClick'),
  organization: ontola('organization'),
  pages: ontola('pages'),
  parentMenu: ontola('parentMenu'),
  pass: ontola('pass'),
  password: ontola('password'),
  pluralLabel: ontola('pluralLabel'),
  profileMenu: ontola('profileMenu'),
  publishAction: ontola('publishAction'),
  query: ontola('query'),
  readAction: ontola('readAction'),
  redirectUrl: ontola('redirectUrl'),
  relevance: ontola('relevance'),
  remove: ontola('remove'),
  replace: ontola('replace'),
  resource: ontola('resource'),
  sendConfirmationAction: ontola('sendConfirmationAction'),
  settingsMenu: ontola('settingsMenu'),
  shIn: ontola('shIn'),
  shareMenu: ontola('shareMenu'),
  signUpAction: ontola('signUpAction'),
  sortDirection: ontola('sortDirection'),
  sortKey: ontola('sortKey'),
  sortOptions: ontola('sortOptions'),
  startedAction: ontola('startedAction'),
  submitAction: ontola('submitAction'),
  svg: ontola('svg'),
  tabsMenu: ontola('tabsMenu'),
  terms: ontola('terms'),
  topology: ontola('topology'),
  trashAction: ontola('trashAction'),
  updateAction: ontola('updateAction'),
  view: ontola('view'),
  visible: ontola('visible'),
  void: ontola('void'),
  widgetResource: ontola('widgetResource'),
  widgetSize: ontola('widgetSize'),
  widgets: ontola('widgets'),
  wrapper: ontola('wrapper'),
  zoomLevel: ontola('zoomLevel'),
};
