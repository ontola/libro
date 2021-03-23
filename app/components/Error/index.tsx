import {
  ErrorProps,
  renderError,
  useLRS,
} from 'link-redux';
import React from 'react';

export const handleErrorStatuses = (handledStatuses: number[]) => (errorProps: ErrorProps): JSX.Element | null => {
  const lrs = useLRS();
  const status = errorProps.linkRequestStatus.status;
  if (status && handledStatuses.indexOf(status) >= 0) {
    return null;
  }

  const {
    error: _,
    ...props
  } = errorProps;

  return renderError(
    {
      ...props,
      onError: undefined,
    },
    lrs,
    errorProps.error,
  );
};

const Error = (): JSX.Element => (
  <p>An unknown error occurred, please try again later.</p>
);

export default Error;
