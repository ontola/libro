import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const flowMessages: Messages = defineMessages({
  enterButtonLabel: {
    defaultMessage: 'Enter',
    id: 'https://app.argu.co/i18n/flow/enterButtonLabel',
  },
  nextButtonLabel: {
    defaultMessage: 'Next',
    id: 'https://app.argu.co/i18n/flow/nextButtonLabel',
  },
  previousAriaLabel: {
    defaultMessage: 'Previous',
    id: 'https://app.argu.co/i18n/flow/previousAriaLabel',
  },
  submitButtonLabel: {
    defaultMessage: 'Submit',
    id: 'https://app.argu.co/i18n/flow/submitButtonLabel',
  },
  submitButtonLabelInvalid: {
    defaultMessage: 'Go back',
    id: 'https://app.argu.co/i18n/flow/submitButtonLabelInvalid',
  },
  wrapUpBodyText: {
    defaultMessage: 'This is the end of the survey. Click on submit to save your awnsers.',
    id: 'https://app.argu.co/i18n/flow/wrapUpBodyText',
  },
  wrapUpBodyTextInvalid: {
    defaultMessage: 'The survey cannot be completed before all required questions are answerd.',
    id: 'https://app.argu.co/i18n/flow/wrapUpBodyTextInvalid',
  },
  wrapUpButtonLabel: {
    defaultMessage: 'Wrap up',
    id: 'https://app.argu.co/i18n/flow/wrapUpButtonLabel',
  },
  wrapUpTitle: {
    defaultMessage: 'Done! 🎉',
    id: 'https://app.argu.co/i18n/flow/wrapUpTitle',
  },
  wrapUpTitleInvalid: {
    defaultMessage: 'Almost there!',
    id: 'https://app.argu.co/i18n/flow/wrapUpTitleInvalid',
  },
});
