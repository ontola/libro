import { defineMessages } from 'react-intl';

const messages = defineMessages({
  emailPlaceholder: {
    context: 'Placeholder for the email field when signing in',
    defaultMessage: 'email@example.com',
    id: 'https://app.argu.co/i18n/forms/session/email/placeholder',
  },
  login: {
    defaultMessage: 'login',
    id: 'https://app.argu.co/i18n/forms/session/login',
  },
  or: {
    defaultMessage: 'or',
    id: 'https://app.argu.co/i18n/forms/session/or',
  },
  register: {
    defaultMessage: 'register',
    id: 'https://app.argu.co/i18n/forms/session/register',
  },
});

export default messages;
