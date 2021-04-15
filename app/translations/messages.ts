import { defineMessages } from 'react-intl';

export const actionMessages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied value to clipboard',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
});

export const badgeMessages = defineMessages({
  continue: {
    defaultMessage: 'Great!',
    id: 'https://app.argu.co/i18n/badges/continue',
  },
});

export const budgetMessages = defineMessages({
  submitted: {
    defaultMessage: 'Your budget is submitted.',
    id: 'https://app.argu.co/i18n/budgets/submitted',
  },
});

export const collapsibleMessages = defineMessages({
  expandOrCollapseTitle: {
    defaultMessage: 'Expand or collapse menu',
    id: 'https://app.argu.co/i18n/collapsible/expandOrCollapseMenu',
  },
});

export const collectionMessages = defineMessages({
  nextLabel: {
    defaultMessage: 'next',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:next/label',
  },
  previousLabel: {
    defaultMessage: 'previous',
    id: 'https://app.argu.co/i18n/as:CollectionPage/as:previous/label',
  },
});

export const dateMessages = defineMessages({
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

export const errorMessages = defineMessages({
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
    defaultMessage: "Maybe it's visible after logging in.",
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
    defaultMessage: "You're making too many request, try again in half a minute.",
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
    defaultMessage: "This feature isn't implemented, please try again later.",
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
  invalidDateMessage: {
    defaultMessage: 'Invalid Date Format',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidDateMessage',
  },
  invalidLabel: {
    defaultMessage: 'unknown',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidLabel',
  },
  maxDateMessage: {
    defaultMessage: 'Date should not be after maximal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/maxDateMessage',
  },
  minDateMessage: {
    defaultMessage: 'Date should not be before minimal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/minDateMessage',
  },
  noMatchingItems: {
    defaultMessage: 'No matching items',
    id: 'https://app.argu.co/i18n/forms/select/noMatchingItems',
  },
  okLabel: {
    defaultMessage: 'ok',
    id: 'https://app.argu.co/i18n/forms/actions/ok',
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

export const grantedGroupMessages = defineMessages({
  privateText: {
    defaultMessage: 'Private',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/private/text',
  },
  privateTitle: {
    defaultMessage: 'Visible for {groupNames}',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/private/title',
  },
  publicText: {
    defaultMessage: 'Public',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/public/text',
  },
  publicTitle: {
    defaultMessage: 'Visible for everyone',
    id: 'https://app.argu.co/i18n/detail/argu:grantedGroups/public/title',
  },
});

export const homeMessages = defineMessages({
  acceptedDecision: {
    defaultMessage: 'Accepted',
    id: 'https://app.argu.co/i18n/arguHome/acceptedDecision',
  },
  again: {
    defaultMessage: 'Again',
    id: 'https://app.argu.co/i18n/arguHome/triadAgain',
  },
  casesBody: {
    defaultMessage: 'From support level measurement to idea generation: Argu can be used in various civic engagement projects.',
    id: 'https://app.argu.co/i18n/arguHome/casesBody',
  },
  casesHeader: {
    defaultMessage: 'Examples of online civic engagement',
    id: 'https://app.argu.co/i18n/arguHome/casesHeader',
  },
  customersBody: {
    defaultMessage: 'We have experience with many municipalities, semi-governments, associations and corporations.',
    id: 'https://app.argu.co/i18n/arguHome/customersBody',
  },
  customersHeader: {
    defaultMessage: 'Some of our customers',
    id: 'https://app.argu.co/i18n/arguHome/customersHeader',
  },
  featuresBody: {
    defaultMessage: 'We host Argu and will continue to develop it, so you can always use the latest features.',
    id: 'https://app.argu.co/i18n/arguHome/featuresBody',
  },
  featuresHeader: {
    defaultMessage: 'Features',
    id: 'https://app.argu.co/i18n/arguHome/featuresHeader',
  },
  motionExampleTitle: {
    defaultMessage: 'Idea',
    id: 'https://app.argu.co/i18n/arguHome/motionExampleTitle',
  },
  next: {
    defaultMessage: 'Next',
    id: 'https://app.argu.co/i18n/arguHome/triadNext',
  },
  questionExampleTitle: {
    defaultMessage: 'How do we solve problem Y?',
    id: 'https://app.argu.co/i18n/arguHome/questionExampleTitle',
  },
  reactionsCount: {
    defaultMessage: 'comments and arguments',
    id: 'https://app.argu.co/i18n/arguHome/reactionsCount',
  },
  requestDemo: {
    defaultMessage: 'Request a demo',
    id: 'https://app.argu.co/i18n/arguHome/requestDemo',
  },
  surveyExampleTitle: {
    defaultMessage: 'How satisfied are you with X?',
    id: 'https://app.argu.co/i18n/arguHome/surveyExampleTitle',
  },
  triadHeader: {
    defaultMessage: 'Engaged throughout your entire decision making process',
    id: 'https://app.argu.co/i18n/arguHome/triadHeader',
  },
  votesCount: {
    defaultMessage: 'votes',
    id: 'https://app.argu.co/i18n/arguHome/votesCount',
  },
});

export const motionMessages = defineMessages({
  motionsCount: {
    defaultMessage: '{count} ideas',
    id: 'https://app.argu.co/i18n/argu:Motion/argu:motionsCount/label',
  },
});

export const pageBuilderToolbarMessages = defineMessages({
  documentDropdownLabel: {
    defaultMessage: 'Documents',
    id: 'https://app.argu.co/i18n/pagebuilder/documentDropdownLabel',
  },
  override: {
    defaultMessage: 'Are you sure you want to overwrite:\n{docID}?',
    id: 'https://app.argu.co/i18n/pagebuilder/override',
  },
  resourceDropdownLabel: {
    defaultMessage: 'Resource (selected no {current}/{total})',
    id: 'https://app.argu.co/i18n/pagebuilder/resourceDropdownLabel',
  },
  saveAsButtonLabel: {
    defaultMessage: 'Save As',
    id: 'https://app.argu.co/i18n/pagebuilder/saveAsButtonLabel',
  },
  saveAsPrompt: {
    defaultMessage: 'Save document as:',
    id: 'https://app.argu.co/i18n/pagebuilder/saveAsPrompt',
  },
  saveButtonLabel: {
    defaultMessage: 'Save',
    id: 'https://app.argu.co/i18n/pagebuilder/saveButtonLabel',
  },
  savedNotification: {
    defaultMessage: 'Document saved.',
    id: 'https://app.argu.co/i18n/pagebuilder/savedNotification',
  },
  themeDropdownLabel: {
    defaultMessage: 'Theme',
    id: 'https://app.argu.co/i18n/pagebuilder/themeDropdownLabel',
  },
});

export const personMessages = defineMessages({
  postedBy: {
    defaultMessage: 'Posted by {name}',
    id: 'https://app.argu.co/i18n/schema:Person/postedByText',
  },
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Person/showProfileText',
  },
});

export const pdfMessages = defineMessages({
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

export const phaseMessages = defineMessages({
  phaseStepperHeader: {
    defaultMessage: 'Phase {number}: ',
    id: 'https://app.argu.co/i18n/phases/stepper/header',
  },
});

export const statusMessages = defineMessages({
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

export const thingMessages = defineMessages({
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Thing/showResourceText',
  },
});

export const typeTranslation = defineMessages({
  false: {
    defaultMessage: 'No',
    id: 'https://app.argu.co/i18n/xsd:boolean/false',
  },
  true: {
    defaultMessage: 'Yes',
    id: 'https://app.argu.co/i18n/xsd:boolean/true',
  },
});

export const voteMessages = defineMessages({
  closedMessage: {
    defaultMessage: 'Voting no longer possible',
    id: 'https://app.argu.co/i18n/votes/expireable/states/closed/message',
  },
  conMessage: {
    defaultMessage: 'Click to vote against this idea',
    id: 'https://app.argu.co/i18n/votes/con/message',
  },
  neutralMessage: {
    defaultMessage: 'Click to vote neutral on this idea',
    id: 'https://app.argu.co/i18n/votes/neutral/message',
  },
  proMessage: {
    defaultMessage: 'Click to vote for this idea',
    id: 'https://app.argu.co/i18n/votes/pro/message',
  },
});

export const surveyMessages = defineMessages({
  closedButtonText: {
    defaultMessage: 'Survey Closed',
    id: 'https://app.argu.co/i18n/survey/button/closed',
  },
  startButtonText: {
    defaultMessage: 'Start!',
    id: 'https://app.argu.co/i18n/survey/button/start',
  },
  thankyouMessage: {
    defaultMessage: 'Thank you for your contribution.',
    id: 'https://app.argu.co/i18n/survey/contribution',
  },
});

