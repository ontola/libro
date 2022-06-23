import { defineMessages } from 'react-intl';

import { Messages } from '../../../translations/messages';

export const validationMessages: Messages = defineMessages({
  invalidEmail: {
    defaultMessage: 'Invalid Email Address',
    id: 'https://app.argu.co/i18n/formValidation/invalidEmail',
  },
  maxCount: {
    defaultMessage: 'Max {max}',
    id: 'https://app.argu.co/i18n/formValidation/maxCount',
  },
  maxLength: {
    defaultMessage: 'Max {max} characters, now: {count}',
    id: 'https://app.argu.co/i18n/formValidation/maxLength',
  },
  minCount: {
    defaultMessage: 'Choose at least {min}',
    id: 'https://app.argu.co/i18n/formValidation/minCount',
  },
  minLength: {
    defaultMessage: 'At least {min} characters',
    id: 'https://app.argu.co/i18n/formValidation/minLength',
  },
  pattern: {
    defaultMessage: 'Value is not allowed',
    id: 'https://app.argu.co/i18n/formValidation/pattern',
  },
  required: {
    defaultMessage: '*Required',
    id: 'https://app.argu.co/i18n/formValidation/required',
  },
});

