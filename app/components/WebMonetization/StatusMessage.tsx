import React from 'react';
import { FormattedMessage } from 'react-intl';

import LinkLoader from '../Loading/LinkLoader';

import { monetizationMessages } from './lib/messages';
import { MONETIZATION_STATE } from './lib/useMonetization';

const StatusMessage = ({
  status,
}: {
  status: MONETIZATION_STATE;
}): JSX.Element => {
  switch (status) {
  case MONETIZATION_STATE.EXTENSION_MISSING:
    return (
      <FormattedMessage
        {...monetizationMessages.extensionMissing}
        tagName="p"
      />
    );
  case MONETIZATION_STATE.STOPPED_PAYING:
    return (
      <FormattedMessage
        {...monetizationMessages.stoppedPaying}
        tagName="p"
      />
    );
  default:
    return (
      <LinkLoader />
    );
  }
};

export default StatusMessage;
