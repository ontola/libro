import { renderError, useLRS } from 'link-redux';
import React from 'react';

export const handleErrorStatuses = (handledStatuses) => (errorProps) => {
  const lrs = useLRS();
  if (handledStatuses.indexOf(errorProps.linkRequestStatus.status) >= 0) {
    return null;
  }

  return renderError(
    {
      ...errorProps,
      error: null,
      onError: null,
    },
    lrs,
    errorProps.error
  );
};

const Error = () => (
  <p>An unknown error occurred, please try again later.</p>
);

export default Error;
