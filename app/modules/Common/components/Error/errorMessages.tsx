import * as rdfx from '@ontologies/rdf';
import HttpStatus from 'http-status-codes';
import { RequestStatus } from 'link-lib';
import { useIds } from 'link-redux';
import { MessageDescriptor, useIntl } from 'react-intl';

import { handle } from '../../../../helpers/logging';
import { errorMessages } from '../../../../translations/messages';
import { ERROR_STATUS_CODES } from '../../lib/metaData';

export function bodyDescriptorForStatus(statusCode?: number): undefined | MessageDescriptor {
  if (!statusCode || statusCode < HttpStatus.MULTIPLE_CHOICES) {
    return undefined;
  }

  const descriptor = errorMessages[`${statusCode}/body`];

  if (!descriptor) {
    handle(new Error(`translation missing for ${statusCode}/body`));

    return undefined;
  }

  return descriptor;
}

export function headerDescriptorForStatus(statusCode?: number): undefined | MessageDescriptor {
  if (!statusCode || statusCode < HttpStatus.MULTIPLE_CHOICES) {
    return undefined;
  }

  const descriptor = errorMessages[`${statusCode}/header`];

  if (!descriptor) {
    handle(new Error(`translation missing for ${statusCode}/header`));

    return undefined;
  }

  return descriptor;
}

export const useErrorStatus = (linkRequestStatus?: RequestStatus): number | undefined =>  {
  const [errorType] = useIds(rdfx.type);

  if (linkRequestStatus?.status) {
    return linkRequestStatus.status;
  }

  return ERROR_STATUS_CODES[errorType?.value];
};

export function useTitleForStatus(statusCode: number | undefined): undefined | string {
  const intl = useIntl();
  const header = headerDescriptorForStatus(statusCode);
  const body = bodyDescriptorForStatus(statusCode);

  return [header, body]
    .map((descriptor) => descriptor ? intl.formatMessage(descriptor) : undefined)
    .filter(Boolean)
    .join(' - ');
}
