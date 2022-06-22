import HttpStatus from 'http-status-codes';
import { EmptyRequestStatus, FulfilledRequestStatus } from 'link-lib';
import { ErrorProps } from 'link-redux';
import React from 'react';

import { ReloadLinkedObject } from '../../hooks/useErrorReload';

export type RequestStatus = EmptyRequestStatus | FulfilledRequestStatus;

export interface ErrorComponentProps extends Partial<ErrorProps> {
  caughtError?: Error,
  children?: React.ReactNode;
  reloadLinkedObject: ReloadLinkedObject;
}

export const notAvailableError = (status?: number | null): boolean => (
  status ? [HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN, HttpStatus.NOT_FOUND].includes(status) : false
);

export const shouldShowSignIn = (actorType?: string, statusCode?: number): boolean => (
  actorType === 'GuestUser' && notAvailableError(statusCode)
);
