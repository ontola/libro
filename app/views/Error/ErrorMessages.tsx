import HttpStatus from 'http-status-codes';
import { MessageDescriptor, useIntl } from 'react-intl';

import { handle } from '../../helpers/logging';
import { errorMessages } from '../../translations/messages';

import { RequestStatus } from './helpers';

export function bodyDescriptorForStatus(requestStatus?: RequestStatus): undefined | MessageDescriptor {
  if (!requestStatus?.requested || requestStatus.status < HttpStatus.MULTIPLE_CHOICES) {
    return undefined;
  }

  const descriptor = errorMessages[`${requestStatus.status}/body`];

  if (!descriptor) {
    handle(new Error(`translation missing for ${requestStatus.status}/body`));

    return undefined;
  }

  return descriptor;
}

export function headerDescriptorForStatus(requestStatus?: RequestStatus): undefined | MessageDescriptor {
  if (!requestStatus?.requested || requestStatus.status < HttpStatus.MULTIPLE_CHOICES) {
    return undefined;
  }

  const descriptor = errorMessages[`${requestStatus.status}/header`];

  if (!descriptor) {
    handle(new Error(`translation missing for ${requestStatus.status}/header`));

    return undefined;
  }

  return descriptor;
}

export function useTitleForStatus(requestStatus?: RequestStatus): undefined | string {
  const intl = useIntl();

  if (!requestStatus?.requested) {
    return undefined;
  }

  const header = headerDescriptorForStatus(requestStatus);
  const body = bodyDescriptorForStatus(requestStatus);

  return [header, body]
    .map((descriptor) => descriptor ? intl.formatMessage(descriptor) : undefined)
    .filter(Boolean)
    .join(' - ');
}
