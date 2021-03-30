import HttpStatus from 'http-status-codes';

import { handle } from '../../helpers/logging';
import { errorMessages } from '../../translations/messages';

export function messageBodyForStatus(requestStatus) {
  if (!requestStatus.requested || requestStatus.status < HttpStatus.MULTIPLE_CHOICES) {
    return null;
  }

  const msg = errorMessages[`${requestStatus.status}/body`];

  if (!msg) {
    handle(new Error(`translation missing for ${requestStatus.status}/body`));

    return null;
  }

  return msg;
}

export function bodyForStatus(formatMessage, requestStatus) {
  const msg = messageBodyForStatus(requestStatus);
  if (!msg) {
    return null;
  }

  return formatMessage(msg);
}

export function headerForStatus(formatMessage, requestStatus) {
  if (!requestStatus.requested || requestStatus.status < HttpStatus.MULTIPLE_CHOICES) {
    return null;
  }

  const msg = errorMessages[`${requestStatus.status}/header`];
  if (!msg) {
    handle(new Error(`translation missing for ${requestStatus.status}/header`));

    return null;
  }

  return formatMessage(msg);
}

export function titleForStatus(formatMessage, requestStatus) {
  if (!requestStatus || !requestStatus.requested) {
    return null;
  }

  return `${headerForStatus(formatMessage, requestStatus)} - ${bodyForStatus(formatMessage, requestStatus)}`;
}
