import { LinkReduxLRSType } from 'link-redux';

export const HTTP_RETRY_WITH = 449;

export const handleHTTPRetry = (lrs: LinkReduxLRSType, e: any, onDone: () => Promise<any>) => {
  const actionsHeader = e.response.headers.get('Exec-Action');

  (lrs.api as any)
    .execExecHeader(actionsHeader, { onDone });

  return Promise.reject();
};
