export const HTTP_RETRY_WITH = 449;

export const handleHTTPRetry = (lrs, e, onDone) => {
  const actionsHeader = e.response.headers.get('Exec-Action');

  lrs
    .api
    .execExecHeader(actionsHeader, { onDone });

  return Promise.reject();
};
