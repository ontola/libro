import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const messages: Messages = defineMessages({
  showInBroker: {
    defaultMessage: 'Bekijk in de Broker',
    id: 'https://dexpods.eu/i18n/showInBroker',
  },
  showInDexes: {
    defaultMessage: 'Bekijk op Dexes',
    id: 'https://dexpods.eu/i18n/showInDexes',
  },
});
