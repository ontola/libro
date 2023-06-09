import { MessageDescriptor, defineMessages } from 'react-intl';

export type Messages = { [key: string]: MessageDescriptor };

export const academyMessages: Messages = defineMessages({
  chapterNavigationAriaLabel: {
    defaultMessage: 'Chapter navigation',
    id: 'https://app.argu.co/i18n/academy/chapterNavigationAriaLabel',
  },
  pdfDownload: {
    defaultMessage: 'Save academy as PDF',
    id: 'https://app.argu.co/i18n/academy/pdfDownload',
  },
  progressBarAriaLabel: {
    defaultMessage: 'Percentage of read chapters.',
    id: 'https://app.argu.co/i18n/academy/progressBarAriaLabel',
  },
  searchIn: {
    defaultMessage: 'Search in {title}',
    id: 'https://app.argu.co/i18n/academy/searchIn',
  },
});

export const actionMessages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied value to clipboard',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
  copyTooltip: {
    defaultMessage: 'Copy to clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copyTooltip',
  },
});

export const blogMessages: Messages = defineMessages({
  category: {
    defaultMessage: 'Category:',
    id: 'https://app.argu.co/i18n/blogs/category',
  },
  shareBlog: {
    defaultMessage: 'Share this blog post',
    id: 'https://app.argu.co/i18n/blogs/share',
  },
});

export const booleanTranslation: Messages = defineMessages({
  false: {
    defaultMessage: 'No',
    id: 'https://app.argu.co/i18n/xsd:boolean/false',
  },
  true: {
    defaultMessage: 'Yes',
    id: 'https://app.argu.co/i18n/xsd:boolean/true',
  },
});

export const caseMessages: Messages = defineMessages({
  learnMore: {
    defaultMessage: 'Want to learn more about this project?',
    id: 'https://app.argu.co/i18n/case/learnMore',
  },
});

export const collapsibleMessages: Messages = defineMessages({
  expandOrCollapseTitle: {
    defaultMessage: 'Expand or collapse menu',
    id: 'https://app.argu.co/i18n/collapsible/expandOrCollapseMenu',
  },
});

export const collectionMessages: Messages = defineMessages({
  add: {
    defaultMessage: 'Add item',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:Add/placeholder',
  },
  collectionActionsAriaLabel: {
    defaultMessage: 'Collection actions',
    id: 'https://app.argu.co/i18n/as:CollectionPage/collectionActionsAriaLabel',
  },
  filter: {
    defaultMessage: 'Filter',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:Filter/placeholder',
  },
  nextLabel: {
    defaultMessage: 'next',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:next/label',
  },
  previousLabel: {
    defaultMessage: 'previous',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:previous/label',
  },
  sort: {
    defaultMessage: 'Sort',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:Sort/placeholder',
  },
});

export const dateMessages: Messages = defineMessages({
  dateCreated: {
    defaultMessage: 'created: {date}',
    id: 'https://app.argu.co/i18n/schema:dateCreated/label',
  },
  dateModified: {
    defaultMessage: 'edited: {date}',
    id: 'https://app.argu.co/i18n/schema:dateModified/label',
  },
  datePublished: {
    defaultMessage: 'published: {date}',
    id: 'https://app.argu.co/i18n/schema:datePublished/label',
  },
  dateSubmitted: {
    defaultMessage: 'submitted: {date}',
    id: 'https://app.argu.co/i18n/schema:dateSubmitted/label',
  },
  duration: {
    defaultMessage: 'replaceme {date}',
    id: 'https://app.argu.co/i18n/schema:duration/label',
  },
  endDate: {
    defaultMessage: 'end date: {date}',
    id: 'https://app.argu.co/i18n/schema:endDate/label',
  },
  lastActivityAt: {
    defaultMessage: 'last activity: {date}',
    id: 'https://app.argu.co/i18n/argu:lastActivityAt/label',
  },
  startDate: {
    defaultMessage: 'start date: {date}',
    id: 'https://app.argu.co/i18n/schema:startDate/label',
  },
});

export const dialogMessages: Messages = defineMessages({
  back: {
    defaultMessage: 'Go back',
    id: 'https://app.argu.co/i18n/dialog/back',
  },
});

export const errorMessages: Messages = defineMessages({
  '400/body': {
    defaultMessage: 'The request made cannot be fulfilled because it contains bad syntax, check your URL parameters or refresh the page that linked to this resource.',
    id: 'https://app.argu.co/i18n/errors/request/200/body',
  },
  '400/header': {
    defaultMessage: 'Bad request (400 Bad Request)',
    id: 'https://app.argu.co/i18n/errors/request/200/header',
  },
  '401/body': {
    defaultMessage: 'You have to be logged in to view this resource.',
    id: 'https://app.argu.co/i18n/errors/request/401/body',
  },
  '401/header': {
    defaultMessage: 'Unauthorized',
    id: 'https://app.argu.co/i18n/errors/request/401/header',
  },
  '403/body': {
    defaultMessage: 'Maybe it\'s visible after logging in.',
    id: 'https://app.argu.co/i18n/errors/request/403/body',
  },
  '403/header': {
    defaultMessage: 'This item is hidden',
    id: 'https://app.argu.co/i18n/errors/request/403/header',
  },
  '404/body': {
    defaultMessage: 'Maybe the item you are looking for is deleted or never existed.',
    id: 'https://app.argu.co/i18n/errors/request/404/body',
  },
  '404/header': {
    defaultMessage: 'This item is not found',
    id: 'https://app.argu.co/i18n/errors/request/404/header',
  },
  '406/body': {
    defaultMessage: 'This resource cannot be viewed in the current format.',
    id: 'https://app.argu.co/i18n/errors/request/406/body',
  },
  '406/header': {
    defaultMessage: 'Not acceptable',
    id: 'https://app.argu.co/i18n/errors/request/406/header',
  },
  '408/body': {
    defaultMessage: 'The request took too long, refresh the page or try again later.',
    id: 'https://app.argu.co/i18n/errors/request/408/body',
  },
  '408/header': {
    defaultMessage: 'Request timeout',
    id: 'https://app.argu.co/i18n/errors/request/408/header',
  },
  '409/body': {
    defaultMessage: 'The change could not be persisted because the resource was edited since it was opened locally.',
    id: 'https://app.argu.co/i18n/errors/request/409/body',
  },
  '409/header': {
    defaultMessage: 'Conflict',
    id: 'https://app.argu.co/i18n/errors/request/409/header',
  },
  '410/body': {
    defaultMessage: 'The resource has been deleted permanently.',
    id: 'https://app.argu.co/i18n/errors/request/410/body',
  },
  '410/header': {
    defaultMessage: 'Gone',
    id: 'https://app.argu.co/i18n/errors/request/410/header',
  },
  '413/body': {
    defaultMessage: 'The item that you are uploading is too large. Go back and try a smaller file.',
    id: 'https://app.argu.co/i18n/errors/request/413/body',
  },
  '413/header': {
    defaultMessage: 'Request entity too large (413 Payload Too Large)',
    id: 'https://app.argu.co/i18n/errors/request/413/header',
  },
  '422/body': {
    defaultMessage: 'The item that you are trying to create cannot be processed.',
    id: 'https://app.argu.co/i18n/errors/request/422/body',
  },
  '422/header': {
    defaultMessage: 'Unprocessable Entity',
    id: 'https://app.argu.co/i18n/errors/request/422/header',
  },
  '429/body': {
    defaultMessage: 'You\'re making too many request, try again in half a minute.',
    id: 'https://app.argu.co/i18n/errors/request/429/body',
  },
  '429/header': {
    defaultMessage: 'Too many requests',
    id: 'https://app.argu.co/i18n/errors/request/429/header',
  },
  '499/body': {
    defaultMessage: 'There was a (network) issue during this request, check the internet connection, please retry or try a different browser.',
    id: 'https://app.argu.co/i18n/errors/request/499/body',
  },
  '499/header': {
    defaultMessage: 'Problem with the browser',
    id: 'https://app.argu.co/i18n/errors/request/499/header',
  },
  '500/body': {
    defaultMessage: 'An error occurred on our side, please try again later.',
    id: 'https://app.argu.co/i18n/errors/request/500/body',
  },
  '500/header': {
    defaultMessage: 'Internal server error',
    id: 'https://app.argu.co/i18n/errors/request/500/header',
  },
  '501/body': {
    defaultMessage: 'This feature isn\'t implemented, please try again later.',
    id: 'https://app.argu.co/i18n/errors/request/501/body',
  },
  '501/header': {
    defaultMessage: 'Not implemented',
    id: 'https://app.argu.co/i18n/errors/request/501/header',
  },
  '502/body': {
    defaultMessage: 'There was a networking issue during this request, please retry or try again later',
    id: 'https://app.argu.co/i18n/errors/request/502/body',
  },
  '502/header': {
    defaultMessage: 'Bad gateway',
    id: 'https://app.argu.co/i18n/errors/request/502/header',
  },
  '503/body': {
    defaultMessage: 'There was a networking issue during this request, please retry or try again later',
    id: 'https://app.argu.co/i18n/errors/request/503/body',
  },
  '503/header': {
    defaultMessage: 'Service unavailable',
    id: 'https://app.argu.co/i18n/errors/request/503/header',
  },
  '504/body': {
    defaultMessage: 'There was a networking issue during this request, please retry or try again later',
    id: 'https://app.argu.co/i18n/errors/request/504/body',
  },
  '504/header': {
    defaultMessage: 'Gateway timeout',
    id: 'https://app.argu.co/i18n/errors/request/504/header',
  },
  clickRetry: {
    defaultMessage: 'Click to retry',
    id: 'https://app.argu.co/i18n/errors/clickToRetry/label',
  },
});

export const footerMessages: Messages = defineMessages({
  policy: {
    defaultMessage: 'Terms of service',
    id: 'https://app.argu.co/i18n/footer/policy',
  },
  privacy: {
    defaultMessage: 'Privacy',
    id: 'https://app.argu.co/i18n/footer/privacy',
  },
});

export const formMessages = defineMessages({
  cancelLabel: {
    defaultMessage: 'cancel',
    id: 'https://app.argu.co/i18n/forms/actions/cancel',
  },
  clearLabel: {
    defaultMessage: 'clear',
    id: 'https://app.argu.co/i18n/forms/actions/clear',
  },
  close: {
    defaultMessage: 'Close',
    id: 'https://app.argu.co/i18n/forms/actions/close',
  },
  defaultResponseType: {
    defaultMessage: 'response',
    id: 'https://app.argu.co/i18n/forms/omniform/defaultResponseType',
  },
  fileUploadFailed: {
    defaultMessage: 'An error occurred while uploading the file',
    id: 'https://app.argu.co/i18n/forms/fileUploadFailed',
  },
  invalidDateMessage: {
    defaultMessage: 'Invalid Date Format',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidDateMessage',
  },
  invalidLabel: {
    defaultMessage: 'unknown',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidLabel',
  },
  invalidValue: {
    defaultMessage: 'Value is invalid',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidValue',
  },
  invalidValues: {
    defaultMessage: 'Contains invalid values',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidValues',
  },
  markdownPreview: {
    defaultMessage: 'Preview',
    id: 'https://app.argu.co/i18n/forms/markdownPreview',
  },
  maxDateMessage: {
    defaultMessage: 'Date should not be after maximal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/maxDateMessage',
  },
  minDateMessage: {
    defaultMessage: 'Date should not be before minimal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/minDateMessage',
  },
  newLabel: {
    defaultMessage: 'Add',
    id: 'https://app.argu.co/i18n/forms/newLabel',
  },
  newTrigger: {
    defaultMessage: 'New ...',
    id: 'https://app.argu.co/i18n/forms/newTrigger',
  },
  noMatchingItems: {
    defaultMessage: 'No matching items',
    id: 'https://app.argu.co/i18n/forms/select/noMatchingItems',
  },
  okLabel: {
    defaultMessage: 'ok',
    id: 'https://app.argu.co/i18n/forms/actions/ok',
  },
  omniformHeader: {
    defaultMessage: 'What do you think?',
    id: 'https://app.argu.co/i18n/forms/omniform/header',
  },
  radioNoOptions: {
    defaultMessage: 'No options available',
    id: 'https://app.argu.co/i18n/forms/radioGroup/noOptions',
  },
  showMarkdownInstructions: {
    defaultMessage: 'Text formatting instructions',
    id: 'https://app.argu.co/i18n/forms/showMarkdownInstructions',
  },
  todayLabel: {
    defaultMessage: 'now',
    id: 'https://app.argu.co/i18n/forms/actions/showToday',
  },
  typeToSearch: {
    defaultMessage: 'Type to start searching',
    id: 'https://app.argu.co/i18n/forms/select/typeToSearch',
  },
});

export const hiddenRequiredInputErrors: Messages = defineMessages({
  location: {
    defaultMessage: 'Please select a location',
    id: 'https://app.argu.co/i18n/hiddenRequiredInput/location',
  },
  zoomLevel: {
    defaultMessage: 'Please select a zoom level',
    id: 'https://app.argu.co/i18n/hiddenRequiredInput/zoomLevel',
  },
});

export const imageAltMessages: Messages = defineMessages({
  arguLogo: {
    defaultMessage: 'the Argu logo',
    id: 'https://app.argu.co/i18n/imageAlts/arguLogo',
  },
});

export const landmarkMessages: Messages = defineMessages({
  navigationBar: {
    defaultMessage: 'Navigation bar',
    id: 'https://app.argu.co/i18n/landmarkMessages/navigationBar',
  },
  subsectionLabel: {
    defaultMessage: 'Participate',
    id: 'https://app.argu.co/i18n/landmarkMessages/subsectionLabel',
  },
});

export const mailchimpFormMessages: Messages = defineMessages({
  mailAddress: {
    defaultMessage: 'Email address',
    id: 'https://app.argu.co/i18n/mailchimpForm/mailAddress',
  },
  subscribe: {
    defaultMessage: 'Subscribe',
    id: 'https://app.argu.co/i18n/mailchimpForm/subscribe',
  },
});

export const navBarMessages: Messages = defineMessages({
  moreDropdownButton: {
    defaultMessage: 'More',
    id: 'https://app.argu.co/i18n/navBarMessages/moreDropdownButton',
  },
  userSettings: {
    defaultMessage: 'User settings',
    id: 'https://app.argu.co/i18n/navBarMessages/userSettings',
  },
});

export const studioToolbarMessages = defineMessages({
  documentDropdownLabel: {
    defaultMessage: 'Documents',
    id: 'https://rdf.studio/i18n/documentDropdownLabel',
  },
  exportButtonLabel: {
    defaultMessage: 'Export',
    id: 'https://rdf.studio/i18n/exportButtonLabel',
  },
  importButtonLabel: {
    defaultMessage: 'Import',
    id: 'https://rdf.studio/i18n/importButtonLabel',
  },
  importDialogConfirm: {
    defaultMessage: 'import',
    id: 'https://rdf.studio/i18n/importDialog/confirm',
  },
  importDialogText: {
    defaultMessage: 'This will overwrite all existing resources! Paste hextuples to import.',
    id: 'https://rdf.studio/i18n/importDialog/text',
  },
  importDialogTitle: {
    defaultMessage: 'Import data',
    id: 'https://rdf.studio/i18n/importDialog/title',
  },
  override: {
    defaultMessage: 'Are you sure you want to overwrite:\n{docID}?',
    id: 'https://rdf.studio/i18n/override',
  },
  prerenderButtonLabel: {
    defaultMessage: 'Prerender & Save',
    id: 'https://rdf.studio/i18n/prerenderButtonLabel',
  },
  resourceDropdownLabel: {
    defaultMessage: 'Resource (selected no {current}/{total})',
    id: 'https://rdf.studio/i18n/resourceDropdownLabel',
  },
  saveAsButtonLabel: {
    defaultMessage: 'Save As',
    id: 'https://rdf.studio/i18n/saveAsButtonLabel',
  },
  saveAsPrompt: {
    defaultMessage: 'Save document as:',
    id: 'https://rdf.studio/i18n/saveAsPrompt',
  },
  saveButtonLabel: {
    defaultMessage: 'Save',
    id: 'https://rdf.studio/i18n/saveButtonLabel',
  },
  saveFailedNotification: {
    defaultMessage: 'Failed to save document.',
    id: 'https://rdf.studio/i18n/saveFailedNotification',
  },
  savedNotification: {
    defaultMessage: 'Document saved.',
    id: 'https://rdf.studio/i18n/savedNotification',
  },
});

export const studioExportMessages = defineMessages({
  dialogTitle: {
    defaultMessage: 'Export Data',
    id: 'https://rdf.studio/i18n/exportDialog/dialogTitle',
  },
  saveChanges: {
    defaultMessage: 'Save changes before exporting to prevent inconsistencies.',
    id: 'https://rdf.studio/i18n/exportDialog/saveChanges',
  },
});

export const studioDistributionMessages = defineMessages({
  actionDeploy: {
    defaultMessage: 'Deploy',
    id: 'https://rdf.studio/i18n/distributions/actionDeploy',
  },
  actionUnmount: {
    defaultMessage: 'Unmount',
    id: 'https://rdf.studio/i18n/distributions/actionUnmount',
  },
  deployDialogBody: {
    defaultMessage: 'Mounting distribution v{version} to:',
    id: 'https://rdf.studio/i18n/distributions/deployDialogBody',
  },
  deployDialogTitle: {
    defaultMessage: 'Deploy Distribution',
    id: 'https://rdf.studio/i18n/distributions/deployDialogTitle',
  },
  deploySuccess: {
    defaultMessage: 'Distribution {version} deployed to {route}',
    id: 'https://rdf.studio/i18n/distributions/deploySuccess',
  },
  distributionDialogPrimaryButton: {
    defaultMessage: 'Create',
    id: 'https://rdf.studio/i18n/distributions/distributionDialogPrimaryButton',
  },
  distributionDialogTitle: {
    defaultMessage: 'Create Distribution',
    id: 'https://rdf.studio/i18n/distributions/distributionDialogTitle ',
  },
  distributionDialogWarning: {
    defaultMessage: 'Warning! You have unsaved changes. Creating a new distribution now will not include these changes.',
    id: 'https://rdf.studio/i18n/distributions/distributionDialogWarning',
  },
  distributionsHeading: {
    defaultMessage: 'Distributions',
    id: 'https://rdf.studio/i18n/distributions/distributionsHeading',
  },
  publicationsHeading: {
    defaultMessage: 'Publications',
    id: 'https://rdf.studio/i18n/distributions/publicationsHeading',
  },
  tableHeadingActions: {
    defaultMessage: 'Actions',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingActions',
  },
  tableHeadingCreatedAt: {
    defaultMessage: 'Created Date',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingCreatedAt',
  },
  tableHeadingDescription: {
    defaultMessage: 'Description',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingDescription',
  },
  tableHeadingDistribution: {
    defaultMessage: 'Distribution',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingDistribution',
  },
  tableHeadingRoute: {
    defaultMessage: 'Route',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingRoute',
  },
  tableHeadingVersion: {
    defaultMessage: 'Version',
    id: 'https://rdf.studio/i18n/distributions/tableHeadingVersion',
  },
  unmountError: {
    defaultMessage: 'Could not unmount {route}',
    id: 'https://rdf.studio/i18n/distributions/unmountError',
  },
  unmountSuccess: {
    defaultMessage: '{route} unmounted',
    id: 'https://rdf.studio/i18n/distributions/unmountSuccess',
  },
});

export const swipeInputMessages: Messages = defineMessages({
  infoButtonLabel: {
    defaultMessage: 'More info',
    id: 'https://app.argu.co/i18n/swipeInput/infoButtonLabel',
  },
  swipeTutorialText: {
    defaultMessage: 'Swipe to vote.',
    id: 'https://app.argu.co/i18n/swipeInput/swipeTutorialText',
  },
  voteNoButtonLabel: {
    defaultMessage: 'Disagree',
    id: 'https://app.argu.co/i18n/swipeInput/voteNoButtonLabel',
  },
  voteYesButtonLabel: {
    defaultMessage: 'Agree',
    id: 'https://app.argu.co/i18n/swipeInput/voteYesButtonLabel',
  },
});

export const mapMessages: Messages = defineMessages({
  currentLocationTooltip: {
    defaultMessage: 'Move to current location',
    id: 'https://app.argu.co/i18n/map/currentLocationTooltip',
  },
});

export const pdfMessages: Messages = defineMessages({
  commentClickToAdd: {
    defaultMessage: 'Click where you want to add your comment',
    id: 'https://app.argu.co/i18n/pdf/commentClickToAdd',
  },
  commentModeDisable: {
    defaultMessage: 'Cancel',
    id: 'https://app.argu.co/i18n/pdf/commentMode/disable',
  },
  commentModeEnable: {
    defaultMessage: 'Add comment',
    id: 'https://app.argu.co/i18n/pdf/commentMode/enable',
  },
  download: {
    defaultMessage: 'Download file (D)',
    id: 'https://app.argu.co/i18n/pdf/download',
  },
  fullScreen: {
    defaultMessage: 'Fullscreen (F)',
    id: 'https://app.argu.co/i18n/pdf/fullScreen',
  },
  nextPage: {
    defaultMessage: 'Next page (→)',
    id: 'https://app.argu.co/i18n/pdf/nextPage',
  },
  previousPage: {
    defaultMessage: 'Previous page (←)',
    id: 'https://app.argu.co/i18n/pdf/previousPage',
  },
});

export const salesMessages = defineMessages({
  contactUs: {
    defaultMessage: 'Contact us',
    id: 'https://app.argu.co/i18n/sales/contactUs',
  },
  intervalSwitcherMonthly: {
    defaultMessage: 'Monthly',
    id: 'https://app.argu.co/i18n/sales/intervalSwitcherMonthly',
  },
  intervalSwitcherYearly: {
    defaultMessage: 'Save 10% annually',
    id: 'https://app.argu.co/i18n/sales/intervalSwitcherYearly',
  },
  priceIntervalMonthly: {
    defaultMessage: '/ month',
    id: 'https://app.argu.co/i18n/sales/priceIntervalMonthly',
  },
  priceIntervalYearly: {
    defaultMessage: '/ year',
    id: 'https://app.argu.co/i18n/sales/priceIntervalYearly',
  },
  showAll: {
    defaultMessage: 'Show all',
    id: 'https://app.argu.co/i18n/sales/showAll',
  },
});

export const statusMessages: Messages = defineMessages({
  closedTooltip: {
    defaultMessage: 'Closed on {date}',
    id: 'https://app.argu.co/i18n/expireable/states/closed/tooltip',
  },
  expiringTooltip: {
    defaultMessage: 'Closing on {date}',
    id: 'https://app.argu.co/i18n/expireable/states/expiring/tooltip',
  },
  pinnedAtLabel: {
    defaultMessage: 'Pinned at {date}',
    id: 'https://app.argu.co/i18n/pinnable/states/pinned/pinnedAtLabel',
  },
});

