import React, { ReactNode } from 'react';
import { MessageDescriptor, defineMessages } from 'react-intl';

type Messages = { [key: string]: MessageDescriptor };

export const monetizationMessages: Messages = defineMessages({
  extensionMissing: {
    defaultMessage: 'Get the <a>Coil Browser extension</a> to continue.',
    id: 'https://app.argu.co/i18n/monetization/extensionMissing',
    values: {
      a: (children: ReactNode) => (
        <a href="https://help.coil.com/docs/membership/coil-extension/index.html">
          {children}
        </a>
      ),
    },
  },
  intro: {
    defaultMessage: 'This content can only be accessed through Webmonetization.',
    id: 'https://app.argu.co/i18n/monetization/intro',
  },
  snackbar: {
    defaultMessage: 'WebMonetization started, thanks for your support!',
    id: 'https://app.argu.co/i18n/monetization/snackbar',
  },
  stoppedPaying: {
    defaultMessage: 'Something went wrong. Is your Wallet (e.g. Coil wallet) working, and do you have a subscription?',
    id: 'https://app.argu.co/i18n/monetization/stoppedPaying',
  },
});

