import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const academyMessages: Messages = defineMessages({
  pdfDownload: {
    defaultMessage: 'Save academy as PDF',
    id: 'https://app.argu.co/i18n/academy/pdfDownload',
  },
});

export const actionMessages: Messages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied value to clipboard',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
});

export const badgeMessages: Messages = defineMessages({
  continue: {
    defaultMessage: 'Great!',
    id: 'https://app.argu.co/i18n/badges/continue',
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

export const formMessages: Messages = defineMessages({
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
  invalidEmailMessage: {
    defaultMessage: 'Email is invalid.',
    id: 'https://app.argu.co/i18n/forms/multipleemailinput/invalidEmailMessage',
  },
  invalidLabel: {
    defaultMessage: 'unknown',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidLabel',
  },
  maxDateMessage: {
    defaultMessage: 'Date should not be after maximal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/maxDateMessage',
  },
  maxEmailCountMessage: {
    defaultMessage: 'Maximum amount of emails reached ({count}/{maxCount}).',
    id: 'https://app.argu.co/i18n/forms/multipleemailinput/maxEmailCountMessage',
  },
  maxEmailLengthMessage: {
    defaultMessage: 'Message is too long ({length}/{maxLength}).',
    id: 'https://app.argu.co/i18n/forms/multipleemailinput/maxEmailLengthMessage',
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

export const grantedGroupMessages: Messages = defineMessages({
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

export const imageAltMessages: Messages = defineMessages({
  arguLogo: {
    defaultMessage: 'the Argu logo',
    id: 'https://app.argu.co/i18n/imageAlts/arguLogo',
  },
});

export const mailchimpFormMessages: Messages = defineMessages({
  mailAddress: {
    defaultMessage: 'Email address',
    id: 'https://app.argu.co/i18n/mailchimpForm/mailAddress',
  },
});

export const motionMessages: Messages = defineMessages({
  motionsCount: {
    defaultMessage: '{count} ideas',
    id: 'https://app.argu.co/i18n/argu:Motion/argu:motionsCount/label',
  },
});

export const pageBuilderToolbarMessages: Messages = defineMessages({
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
  saveFailedNotification: {
    defaultMessage: 'Failed to save document.',
    id: 'https://app.argu.co/i18n/pagebuilder/saveFailedNotification',
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

export const personMessages: Messages = defineMessages({
  postedBy: {
    defaultMessage: 'Posted by {name}',
    id: 'https://app.argu.co/i18n/schema:Person/postedByText',
  },
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Person/showProfileText',
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

export const phaseMessages: Messages = defineMessages({
  phaseStepperHeader: {
    defaultMessage: 'Phase {number}: ',
    id: 'https://app.argu.co/i18n/phases/stepper/header',
  },
});

export const salesMessages: Messages = defineMessages({
  contactUs: {
    defaultMessage: 'Contact us',
    id: 'https://app.argu.co/i18n/sales/contactUs',
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

export const thingMessages: Messages = defineMessages({
  showProfile: {
    defaultMessage: "Show {name}'s profile",
    id: 'https://app.argu.co/i18n/schema:Thing/showResourceText',
  },
});

export const voteMessages: Messages = defineMessages({
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

export const surveyMessages: Messages = defineMessages({
  closedButtonText: {
    defaultMessage: 'Survey Closed',
    id: 'https://app.argu.co/i18n/survey/button/closed',
  },
  startButtonText: {
    defaultMessage: 'Start!',
    id: 'https://app.argu.co/i18n/survey/button/start',
  },
  thankyouMessage: {
    defaultMessage: 'Thank you for your response.',
    id: 'https://app.argu.co/i18n/survey/contribution',
  },
});

