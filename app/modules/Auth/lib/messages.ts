import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const authMessages: Messages = defineMessages({
  newSessionLink: {
    defaultMessage: 'Log in / sign up',
    description: 'Link to the page for signing in or registering',
    id: 'https://app.argu.co/i18n/auth/newSessionLink',
  },
  signOutLabel: {
    defaultMessage: 'Log out',
    id: 'https://app.argu.co/i18n/forms/signOut/link/label',
  },
});
