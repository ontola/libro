import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const messages: Messages = defineMessages({
  demoNotice: {
    defaultMessage: 'Warning: this is a beta environment for demonstration purposes',
    id: 'https://dexpods.eu/i18n/demoNotice',
  },
  goToFile: {
    defaultMessage: 'Go to file',
    id: 'https://dexpods.eu/i18n/goToFile',
  },
  published: {
    defaultMessage: 'Published',
    id: 'https://dexpods.eu/i18n/published',
  },
  showInBroker: {
    defaultMessage: 'Show in the Broker',
    id: 'https://dexpods.eu/i18n/showInBroker',
  },
  showInDexes: {
    defaultMessage: 'Show in Dexes',
    id: 'https://dexpods.eu/i18n/showInDexes',
  },
  showPublication: {
    defaultMessage: 'Show publication',
    id: 'https://dexpods.eu/i18n/showPublication',
  },
});
