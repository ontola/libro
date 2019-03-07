import { defineMessages } from 'react-intl';

const messages = defineMessages({
  accountLocked: {
    defaultMessage: 'Account locked due to too many failed login attempts',
    id: 'https://app.argu.co/i18n/forms/session/accountLocked',
  },
  emailPlaceholder: {
    defaultMessage: 'email@example.com',
    description: 'Placeholder for the email field when signing in',
    id: 'https://app.argu.co/i18n/forms/session/email/placeholder',
  },
  invalidPassword: {
    defaultMessage: 'Invalid password',
    id: 'https://app.argu.co/i18n/forms/session/password/invalid',
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
