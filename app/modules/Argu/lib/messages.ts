import { defineMessages } from 'react-intl';

import { Messages } from '../../../translations/messages';

export const commentMessages: Messages = defineMessages({
  showAllLabel: {
    defaultMessage: 'View all {count} reactions...',
    id: 'https://app.argu.co/i18n/schema:Thing/argu:topComment/showAllLabel',
  },
  showProfile: {
    defaultMessage: 'Show {name}\'s profile',
    id: 'https://app.argu.co/i18n/schema:Thing/showResourceText',
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

export const grantsInputMessages: Messages = defineMessages({
  add: {
    defaultMessage: 'Add',
    id: 'https://app.argu.co/i18n/detail/argu:grantsInput/add',
  },
  group: {
    defaultMessage: 'Group',
    id: 'https://app.argu.co/i18n/detail/argu:grantsInput/group',
  },
  inherited: {
    defaultMessage: 'Inherited',
    id: 'https://app.argu.co/i18n/detail/argu:grantsInput/inherited',
  },
});

export const motionMessages: Messages = defineMessages({
  motionsCount: {
    defaultMessage: '{count} ideas',
    id: 'https://app.argu.co/i18n/argu:Motion/argu:motionsCount/label',
  },
});

export const notificationMessages: Messages = defineMessages({
  tooltip: {
    defaultMessage: 'Click to read your notifications',
    id: 'https://app.argu.co/i18n/schema:Thing/argu:unreadCount/tooltip',
  },
});

export const permissionMessages: Messages = defineMessages({
  validForType: {
    defaultMessage: 'Only for {parentType}',
    id: 'https://app.argu.co/i18n/permissions/validForType',
  },
});

export const personMessages: Messages = defineMessages({
  postedBy: {
    defaultMessage: 'Posted by {name}',
    id: 'https://app.argu.co/i18n/schema:Person/postedByText',
  },
  showProfile: {
    defaultMessage: 'Show {name}\'s profile',
    id: 'https://app.argu.co/i18n/schema:Person/showProfileText',
  },
});

export const personShowcaseMessages: Messages = defineMessages({
  ariaLabelLinkedIn: {
    defaultMessage: 'LinkedIn profile of {name}',
    id: 'https://app.argu.co/i18n/personShowcaseMessages/ariaLabelLinkedIn',
  },
});

export const phaseMessages: Messages = defineMessages({
  phaseStepperHeader: {
    defaultMessage: 'Phase {number}: ',
    id: 'https://app.argu.co/i18n/phases/stepper/header',
  },
});

export const voteMessages: Messages = defineMessages({
  confirmGuestUser: {
    defaultMessage: 'Confirm your vote via e-mail:',
    id: 'https://app.argu.co/i18n/forms/session/confirmViaEmail',
  },
  confirmUnconfirmedUser: {
    defaultMessage: 'Please confirm your vote by clicking the link we\'ve sent to {email}',
    id: 'https://app.argu.co/i18n/forms/session/emailConfirmationReminder',
  },
  voteCounts: {
    defaultMessage: '{count, plural, =0 {} one {# vote} other {# votes}}',
    id: 'https://app.argu.co/i18n/votes/count',
  },
});

export const surveyMessages: Messages = defineMessages({
  closedButtonText: {
    defaultMessage: 'Survey Closed',
    id: 'https://app.argu.co/i18n/survey/button/closed',
  },
  continueButtonText: {
    defaultMessage: 'Continue',
    id: 'https://app.argu.co/i18n/survey/button/continue',
  },
  startButtonText: {
    defaultMessage: 'Fill in survey',
    id: 'https://app.argu.co/i18n/survey/button/start',
  },
  thankyouMessage: {
    defaultMessage: 'Thank you for your response.',
    id: 'https://app.argu.co/i18n/survey/contribution',
  },
});
