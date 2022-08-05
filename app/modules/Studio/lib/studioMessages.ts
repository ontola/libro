import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const studioMessages: Messages = defineMessages({
  forbidden: {
    defaultMessage: 'Not allowed to view this content',
    id: 'https://rdf.studio/i18n/forbiddenText',
  },
  login: {
    defaultMessage: 'Login',
    description: 'Link to the page for signing in or registering',
    id: 'https://rdf.studio/i18n/login',
  },
});
