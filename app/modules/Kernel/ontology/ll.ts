import { createNS } from '@ontologies/core';

const ll = createNS('http://purl.org/link-lib/');

export default {
  ns: ll,

  /* classes */
  // eslint-disable-next-line sort-keys
  ErrorResource: ll('ErrorResource'),
  ErrorResponse: ll('ErrorResponse'),
  LoadingResource: ll('LoadingResource'),

  /* properties */
  actionBody: ll('actionBody'),
  blob: ll('blob'),
  dataSubject: ll('dataSubject'),
  errorResponse: ll('errorResponse'),
  forceRender: ll('forceRender'),
  graph: ll('graph'),
  loadingResource: ll('loadingResource'),
  meta: ll('meta'),
  view: ll('view'),
};
